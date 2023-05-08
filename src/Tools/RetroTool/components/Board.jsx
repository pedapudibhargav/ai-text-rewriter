import React, { useState } from 'react';
import {
    Grid, Container, CssBaseline, Typography, Fab, Box
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BoardItem from './BoardItem';
import NewBoardItem from './NewBoardItem';
import BoardsTestData from './BoardsTestData';

const newBoardItemDefault = {
    boardIndex: -1,
    cardIndex: -1,
    content: ''
}
const defaultCardValues = {
    id: 11,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    isVoteRequired: true,
    votes: [
        {
            'voter': 'user1',
            'vote': '👍'
        }
    ]
}
export default function Board() {
    const [openDialog, setOpenDialog] = useState(false);
    const [dataToNewBoardItem, setDataToNewBoardItem] = useState(newBoardItemDefault);
    const voteOptions = ['👍', '👎', '🤐', '🤔'];
    const [boardData, setBoardData] = useState(BoardsTestData);


    const toggleDialog = (booleanFlag) => {
        setOpenDialog(booleanFlag);
    }

    const handleSaveBoardItem = (boardItem) => {
        console.log('boardItem:', boardItem);
        if (!boardItem || boardItem.boardIndex === undefined) {
            console.error('Board item or boardIndex is not defined');
            return alert("Sorry it's not you, it'us");
        }
        const boardIndexIn = boardItem.boardIndex;
        const updatedBoardData = [...boardData];
        const boardToBeUpdated = updatedBoardData[boardIndexIn];
        if (!boardToBeUpdated) {
            return console.error('Board to be updated is not defined');
        }
        if (boardItem.cardIndex === -1) {
            // new card
            const newCard = { ...defaultCardValues };
            newCard['id'] = boardToBeUpdated['cards'].length + 1;
            newCard['content'] = boardItem['content'];
            updatedBoardData[boardIndexIn]['cards'].push(newCard);
        } else {
            // update card
            const cardToBeUpdated = boardToBeUpdated['cards'][boardItem.cardIndex];
            if (!cardToBeUpdated) {
                return console.error('Card to be updated is not defined');
            }
            cardToBeUpdated['content'] = boardItem['content'];
            updatedBoardData[boardIndexIn]['cards'][boardItem.cardIndex] = cardToBeUpdated;
        }
        setBoardData(updatedBoardData);
        toggleDialog(false);
    }

    const addBoardItem = (boardIndex) => {
        console.log('boardIndex:', boardIndex);
        setDataToNewBoardItem({
            boardIndex: boardIndex,
            cardIndex: -1,
            content: ''
        });
        toggleDialog(true);
    }

    const editBoardItem = (boardIndex, cardIndex) => {
        const boardData = boardData[boardIndex];
        const cardData = boardData['cards'][cardIndex];
        const cardContent = cardData['content'];
        setDataToNewBoardItem({
            boardIndex: boardIndex,
            cardIndex: cardIndex,
            content: cardContent
        });
        toggleDialog(true);
    }

    const deleteBoardItem = (boardIndex, cardIndex) => {
        const updatedBoardData = [...boardData];
        updatedBoardData[boardIndex]['cards'].splice(cardIndex, 1);
        setBoardData(updatedBoardData);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="false">
                <Grid container spacing={2} sx={{ my: 2 }}>
                    {
                        boardData.map((board, boardIndex) => {
                            return (
                                <Grid key={board.id} item xs={12 / boardData.length}>
                                    <Typography variant="h5" sx={{ textAlign: 'center' }} gutterBottom>
                                        {board.name}
                                        <Fab onClick={() => addBoardItem(boardIndex)} size="small" sx={{ mx: 2 }} color="primary" aria-label="add">
                                            <AddIcon />
                                        </Fab>
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {
                                            board.cards.map((card, cardIndex) => {
                                                return (
                                                    <BoardItem key={card.id} card={card} handleDelete={()=>deleteBoardItem(boardIndex,cardIndex)} />
                                                )
                                            })
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
                    handleSave={(dataIn) => handleSaveBoardItem(dataIn)}/>
            </Container>
        </React.Fragment>
    )
}
