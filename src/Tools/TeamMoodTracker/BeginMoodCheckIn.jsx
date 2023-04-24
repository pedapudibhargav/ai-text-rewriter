import React, { useState, useEffect } from 'react';
import { Grid, Paper, Button, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './BeginMoodCheckIn.css';

export default function BeginMoodCheckIn() {

  const [uniqueNumber, setUniqueNumber] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2, 7));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [testName, setTestName] = useState('');
  const [touched, setTouched] = useState(false);
  const [isTestNameValid, setIsTestNameValid] = useState(false);
  const BE_URL = process.env.REACT_APP_BACKEND_HOST;
  const navigate = useNavigate();


  // check if username exists in local storage. If not, create new user
  useEffect(() => {
    console.log('LS-usename:' + localStorage.getItem('username'));
    console.log(`username:${username}`);
    if (!username) {
      navigate(`/newuser`);
    }
  }, []);


  // handle username input change
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setTestName(inputValue)
    setTouched(true);
    setIsTestNameValid(validateTestName(inputValue));
  }

  // Validate user input
  const validateTestName = (inputString) => {
    // check if input lenth is less than 80 characters
    return inputString.length < 80;
  }


  // handle new test button click
  const handleNewTestClick = (e) => {
    e.preventDefault();
    if (!isTestNameValid) {
      setTouched(true);
      return;
    }
    console.log('unique number:', uniqueNumber);
    localStorage.setItem("testName", testName);
    console.log(`BE_URL:${BE_URL}`);
    const NEW_GAME_API = `${BE_URL}/api/v1/newgame?gameId=${uniqueNumber}`;
    fetch(NEW_GAME_API).then((response) => {
      if (response.ok) {
        console.log(`New game created:`, response.json());
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
          <p className="tyrnow-subhead">Know how is your team feeling now.</p>
          <h2 className="tyrnow-heading">Team Mood Check-Ins.</h2>
          {touched && !isTestNameValid && (
            <Alert severity="warning" >Your test name should be minimum 1 character and max 80 characteres length</Alert>
          )}
          <form onSubmit={handleNewTestClick}>
            <TextField className="tyrnow-team-name"
              autoComplete='off'
              onChange={(e) => handleInputChange(e)}
              label="Enter Title for your Test" variant="outlined" />
            <Button variant="contained" size="large" onClick={handleNewTestClick} >Try it for Free</Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}