import React, { useState } from 'react';
import {
    Grid, Container, CssBaseline
} from "@mui/material";
import BoardItem from './BoardItem';

export default function Board() {
    const [boardData, setBoardData] = useState([
        {
            id: 1,
            name: 'Went well',
            cards: [
                {
                    id: 11,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    isVoteRequired: true,
                    votes: {
                        up: 0,
                        down: 0,
                        confusing: 0,
                        neutral: 0
                    }
                }
            ]
        },
        {
            id: 2,
            name: 'To improve',
            cards: [
                {
                    id: 21,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    isVoteRequired: true,
                    votes: {
                        up: 0,
                        down: 0,
                        confusing: 0,
                        neutral: 0
                    }
                }
            ]
        },
        {
            id: 3,
            name: 'Action Items',
            cards: [
                {
                    id: 31,
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    isVoteRequired: true,
                    votes: {
                        up: 0,
                        down: 0,
                        confusing: 0,
                        neutral: 0
                    }
                }
            ]
        }
    ]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="false">
                <Grid container spacing={2} sx={{my:2}}>
                    {
                        boardData.map((board) => {
                            return (
                                <Grid key={board.id} item xs={12 / boardData.length}>
                                    {
                                        board.cards.map((card) => {
                                            return (
                                                <BoardItem key={card.id} card={card} />
                                            )
                                        })
                                    }
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </React.Fragment>
    )
}
