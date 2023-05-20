import React, { useState, useEffect } from 'react';
import {
    Grid, Container, Box, Paper, Slider, Stack, Typography, CssBaseline
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { ConnectToMoodSurveyRoom, OpenSocket } from '../Services/MoodsurveyServices';
import { useParams } from "react-router-dom";
import RetroAppBar from '../RetroTool/components/RetroAppBar/RetroAppBar';

function MoodsurveyBoard(props) {
    const [currentUserMood, setCurrentUserMood] = useState(0);
    const { roomId } = useParams();
    const [teamMood, setTeamMood] = useState(0);
    const [socket, setSocket] = useState(OpenSocket());
    const [boardData, setBoardData] = useState(null);
    const NewBoardData = {
        roomId: roomId,
        userChoices: []
    }

    //Styling constants
    const CustomSlider = styled(Slider)({
        '& .MuiSlider-markLabel': {
            fontSize: 24,
        },
        '& .MuiSlider-markLabelActive': {
            fontSize: 30,
        },
        '& .MuiSlider-rail': {
            width: 10
        }
    });

    const TeamSlider = styled(Slider)({
        '& .MuiSlider-markLabel': {
            fontSize: 27,
        },
        '& .MuiSlider-markLabelActive': {
            fontSize: 32,
        },
        '& .MuiSlider-rail': {
            width: 20
        },
        '& .MuiSlider-thumb': {
            height: 30,
            width: 30,
        },
        '& .MuiSlider-track': {
            width: 20
        }
    });

    useEffect(() => {
        ConnectToMoodSurveyRoom(roomId, roomConnectionCallback);
        // if (!boardData)
        //     setBoardData(NewBoardData);
    }, []);

    useEffect(() => {
        if (boardData && boardData.userChoices.length > 0) {
            const sum = boardData.userChoices.reduce((a, b) => a + b.value, 0);
            let avg = sum / boardData.userChoices.length;
            avg = Math.floor(avg);
            setTeamMood(avg);
        }
    }, [boardData, currentUserMood]);

    const marks = [
        {
            value: 0,
            label: '',
        },
        {
            value: 1,
            label: '🤬',
        },
        {
            value: 2,
            label: '😡',
        },
        {
            value: 3,
            label: '😕',
        },
        {
            value: 4,
            label: '😐',
        },
        {
            value: 5,
            label: '🙂',
        },
        {
            value: 6,
            label: '😀',
        },
        {
            value: 7,
            label: '🤩',
        }
    ];

    const roomConnectionCallback = (boardData) => {
        if (!boardData)
            setBoardData(NewBoardData);
        else {
            const username = props.currentUserDetails.userName;
            const currentUserChoice = boardData.userChoices.find(userChoice => userChoice.username === username);
            if (currentUserChoice)
                setCurrentUserMood(currentUserChoice.value);
            setBoardData(boardData);
        }
    };

    // handle slider change
    const handleUserMoodUpdate = (event, newValue) => {
        setCurrentUserMood(newValue);
        const username = props.currentUserDetails.userName;
        const currentUserChoice = boardData.userChoices.find(userChoice => userChoice.username === username);
        if (currentUserChoice)
            currentUserChoice.value = newValue;
        else {
            boardData.userChoices.push({
                username: username,
                value: newValue
            });
        }
        socket.emit('moodsurvey-update', boardData);
    };

    const valuemarkstext = (value) => {
        value = Math.floor(value);
        return marks[value].label;
    }

    socket.on('moodsurvey-update', (updatedBoard) => {
        setBoardData(updatedBoard);
    });


    return (
        <>
            <CssBaseline />
            <RetroAppBar participants={(boardData && boardData.userChoices) ? boardData.userChoices : []} />
            <Container>
                <Grid container spacing={4} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <Paper variant="outlined" sx={{ mt: 2, py: 3, px: 1 }}>
                            <Typography variant="h5" sx={{ textAlign: 'center', mb: 6 }} gutterBottom>
                                How are you feeling today?
                            </Typography>
                            <Box component="span">
                                <Stack spacing={2} direction="column" sx={{ mb: 1, height: 400 }} alignItems="center">
                                    <CustomSlider sx={{
                                        '& input[type="range"]': {
                                            WebkitAppearance: 'slider-vertical',
                                        },
                                    }}
                                        min={0} max={6} aria-label="Volume" orientation="vertical"
                                        value={currentUserMood} getAriaValueText={valuemarkstext} marks={marks} onChange={handleUserMoodUpdate} />
                                </Stack>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper variant="outlined" sx={{ mt: 2, py: 3, px: 1 }}>
                            <Typography variant="h5" sx={{ textAlign: 'center', mb: 6 }} gutterBottom>
                                Overall Team Mood : {teamMood}/6;
                            </Typography>
                            <Box component="span">
                                <Stack spacing={2} direction="column" sx={{ mb: 1, height: 400 }} alignItems="center">
                                    <TeamSlider sx={{
                                        '& input[type="range"]': {
                                            WebkitAppearance: 'slider-vertical',
                                        },
                                    }}
                                        min={0} max={6} aria-label="Volume" orientation="vertical"
                                        value={teamMood} getAriaValueText={valuemarkstext} marks={marks} />
                                </Stack>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default function Moodsurvey(props) {
    return (
        <>
            {
                props.currentUserDetails ?
                    <MoodsurveyBoard currentUserDetails={props.currentUserDetails} /> :
                    <></>
            }
        </>
    )
}