import React, { useState, useEffect } from 'react';
import {
    Grid, Container, CssBaseline, Typography, Fab, Box
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BoardItem from './BoardItem';
import NewBoardItem from './NewBoardItem';
import { NewRetroBoardData } from './BoardsTestData';
import { ConnectToRoomById, OpenSocket } from '../../Services/RetroBoardServices';
import { GetUserDetails } from '../../Services/UserRegistrationService';
import { GetRandomNumberFromPSTTime } from '../../Services/RandomNumber';
import CallMadeIcon from '@mui/icons-material/CallMade';
import RetroAppBar from './RetroAppBar/RetroAppBar';

const newBoardItemDefault = {
    boardIndex: -1,
    cardIndex: -1,
    content: ''
}
const defaultCardValues = {
    id: 11,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isVoteRequired: true,
    votes: []
}

const boardStyles = {
    minHeight: '80vh',
    my: 2
}

export default function Board(props) {
    const ROOM_ID = props.roomId;
    const [openDialog, setOpenDialog] = useState(false);
    const [dataToNewBoardItem, setDataToNewBoardItem] = useState(newBoardItemDefault);
    const [retroBoardData, setRetroBoardData] = useState({ ...NewRetroBoardData, roomId: ROOM_ID });
    const [socket, setSocket] = useState(OpenSocket());


    const socketPostRoomJoin = (boardDataFromRoom) => {
        const userDetails = {
            email: props.currentUserDetails.email,
            username: props.currentUserDetails.userName
        }
        // set organizer
        if (!boardDataFromRoom || !boardDataFromRoom.boards || !boardDataFromRoom.organizer || boardDataFromRoom.organizer.email === "") {
            boardDataFromRoom = { ...retroBoardData, organizer: userDetails };
            socket.emit('board-update', boardDataFromRoom);
        }

        // participant
        if (boardDataFromRoom && boardDataFromRoom.boards && boardDataFromRoom.boards.length > 0) {
            let isAddedasParticipant = false
            if (boardDataFromRoom.organizer.username !== userDetails.username) {
                if (!boardDataFromRoom.participants)
                    boardDataFromRoom.participants = [];
                boardDataFromRoom.participants.forEach((particpant) => {
                    if (particpant.username === userDetails.username)
                        isAddedasParticipant = true;
                }); 
                if (!isAddedasParticipant) {
                    console.log('... setting participant:', userDetails);
                    boardDataFromRoom.participants.push(userDetails);
                    socket.emit('board-update', retroBoardData);
                }
                socket.emit('board-update', boardDataFromRoom);
            }
        }
        setRetroBoardData(boardDataFromRoom);
    };

    useEffect(() => {
        ConnectToRoomById(ROOM_ID, socketPostRoomJoin);
    }, []);

    const toggleDialog = (booleanFlag) => {
        setOpenDialog(booleanFlag);
    }

    const handleSaveBoardItem = (boardItem) => {
        if (!boardItem || boardItem.boardIndex === undefined) {
            console.error('Board item or boardIndex is not defined');
            return alert("Sorry it's not you, it'us");
        }
        const boardIndexIn = boardItem.boardIndex;
        const updatedBoardData = { ...retroBoardData };
        const boardToBeUpdated = updatedBoardData.boards[boardIndexIn];
        if (!boardToBeUpdated) {
            return console.error('Board to be updated is not defined');
        }
        if (boardItem.cardIndex === -1) {
            // new card
            const newCard = { ...defaultCardValues };
            newCard['id'] = GetRandomNumberFromPSTTime();
            newCard['content'] = boardItem['content'];
            updatedBoardData.boards[boardIndexIn]['cards'].push(newCard);
        } else {
            // update card
            const cardToBeUpdated = boardToBeUpdated['cards'][boardItem.cardIndex];
            if (!cardToBeUpdated) {
                return console.error('Card to be updated is not defined');
            }
            cardToBeUpdated['content'] = boardItem['content'];
            updatedBoardData.boards[boardIndexIn]['cards'][boardItem.cardIndex] = cardToBeUpdated;
        }
        setRetroBoardData(updatedBoardData);
        socket.emit('board-update', updatedBoardData);
        toggleDialog(false);
    }

    const addBoardItem = (boardIndex) => {
        setDataToNewBoardItem({
            boardIndex: boardIndex,
            cardIndex: -1,
            content: ''
        });
        toggleDialog(true);
    }

    const editBoardItem = (boardIndex, cardIndex) => {
        const boardIn = retroBoardData.boards[boardIndex];
        const cardIn = boardIn['cards'][cardIndex];
        const cardContent = cardIn['content'];
        setDataToNewBoardItem({
            boardIndex: boardIndex,
            cardIndex: cardIndex,
            content: cardContent
        });
        toggleDialog(true);
    }

    const deleteBoardItem = (boardIndex, cardIndex) => {
        const updatedBoardData = { ...retroBoardData };
        updatedBoardData.boards[boardIndex]['cards'].splice(cardIndex, 1);
        setRetroBoardData(updatedBoardData);
        socket.emit('board-update', updatedBoardData);
    }

    const handleVoteUpdate = (boardIndex, cardIndex, vote) => {
        const username = props.currentUserDetails.userName;
        const updatedBoardData = { ...retroBoardData };
        const board = updatedBoardData.boards[boardIndex];
        const card = board.cards[cardIndex];
        const existingVoteIndex = card.votes.findIndex((v) => v.voter === username);

        if (existingVoteIndex !== -1) {
            // User already voted, update the existing vote
            card.votes[existingVoteIndex].vote = vote;
        } else {
            // User is submitting a new vote
            card.votes.push({ voter: username, vote: vote });
        }
        // Assign the updated card with votes back into BoardsTestData
        updatedBoardData.boards[boardIndex].cards[cardIndex] = card;
        setRetroBoardData(updatedBoardData);
        socket.emit('board-update', updatedBoardData);
    };

    const getUserVoteOnCard = (card) => {
        const usernameIn = props.currentUserDetails.userName;
        const voteIndex = card.votes.findIndex((v) => v.voter === usernameIn);
        if (voteIndex !== -1) {
            return card.votes[voteIndex].vote;
        }
        return null;
    };

    socket.on('board-update', (updatedBoard) => {
        setRetroBoardData(updatedBoard);
    });

    return (
        <React.Fragment>
            <CssBaseline />
            <RetroAppBar participants={[retroBoardData.organizer, ...retroBoardData.participants]} />
            <Container maxWidth="false">
                <Grid container spacing={2} sx={boardStyles}>
                    {
                        retroBoardData.boards.map((board, boardIndex) => {
                            return (
                                <Grid key={boardIndex} item sx={{ borderRight: '1px dashed #afd2f3', pr: 2 }} xs={12 / retroBoardData.boards.length}>
                                    <Typography variant="h5" sx={{ textAlign: 'center' }} gutterBottom>
                                        {board.name}
                                        <Fab onClick={() => addBoardItem(boardIndex)} size="small" sx={{ mx: 2 }} color="primary" aria-label="add">
                                            <AddIcon />
                                        </Fab>
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {
                                            (board && board.cards && board.cards.length > 0) ?
                                                <>
                                                    {board.cards.map((card, cardIndex) => {
                                                        return (
                                                            <BoardItem key={cardIndex} card={card}
                                                                handleVoteClick={(vote) => handleVoteUpdate(boardIndex, cardIndex, vote)}
                                                                handleDelete={() => deleteBoardItem(boardIndex, cardIndex)}
                                                                userVote={getUserVoteOnCard(card)}
                                                                handleEdit={() => editBoardItem(boardIndex, cardIndex)} />
                                                        )
                                                    })
                                                    }
                                                </> :
                                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 2, mt: 6, opacity: 0.3 }}>
                                                    <CallMadeIcon sx={{ fontSize: '6rem' }} />
                                                    <Typography variant="body1" sx={{ textAlign: 'center' }} gutterBottom>
                                                        This board is craving your brilliant ideas. Feed it with a new item!
                                                    </Typography>
                                                </Box>
                                        }
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <NewBoardItem open={openDialog}
                    cardData={dataToNewBoardItem}
                    handleClose={() => toggleDialog(false)}
                    handleSave={(dataIn) => handleSaveBoardItem(dataIn)} />
            </Container>
        </React.Fragment>
    )
}
