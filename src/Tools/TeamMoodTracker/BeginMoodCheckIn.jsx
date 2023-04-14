import React, { useState } from 'react';
import { Grid, Paper, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function BeginMoodCheckIn() {
    const [uniqueNumber, setUniqueNumber] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2, 7));
    const BE_URL = process.env.REACT_APP_BACKEND_HOST;
    const navigate = useNavigate();

    // handle new test button click
    const handleNewTestClick = () => {
      console.log(`BE_URL:${BE_URL}`);
      const NEW_GAME_API = `${BE_URL}/api/v1/newgame?gameId=${uniqueNumber}`;      
      fetch(NEW_GAME_API).then((response) => {
        if(response.ok) {
          console.log(`New game created:`,response.json());
          navigate(`/moodchecker/${uniqueNumber}`);
        } else
        throw new Error('Unable to create new game', response);
      })
      .catch((error) => {
        console.log(error);
      });
    }


    return (
      <Grid className="begin-test-container" container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={5}>
          <Paper className='beging-test-paper'>
            <p className="tyrnow-subhead">How is your team feeling - {BE_URL}</p>
            <h2 className="tyrnow-heading">Team Mood Check-Ins</h2>
            <TextField className="tyrnow-team-name" label="Enter your team name" variant="outlined" />
            <Button variant="contained" size="large" onClick={()=> handleNewTestClick()} >Try it for Free</Button>
          </Paper>
        </Grid>
      </Grid>
    )
}