import React from 'react'
import { Grid, Paper, Button } from "@mui/material";
import {
  useParams, Route, Routes, BrowserRouter, useNavigate
} from "react-router-dom";
import './TeamMoodTracker.css';
import { emotions } from './Emotions.js';
import MoodTestResults from './MoodTestResults';
import BeginMoodCheckIn from './BeginMoodCheckIn';
import NewUser from './NewUser';

const BE_HOST = process.env.REACT_APP_BACKEND_HOST;

// Returns mood card based on emotion
function MoodCard(props) {
  const getBackgroundStyle = (emotion) => {
    const primaryBgColor = emotion["backgroundColor"][0] ? emotion["backgroundColor"][0] : '#000000';
    const secondaryBgColor = emotion["backgroundColor"][1] ? emotion["backgroundColor"][1] : '#000000';
    return {
      background: `linear-gradient(to bottom, ${primaryBgColor} , ${secondaryBgColor})`,
    };
  }
  const backgroundImage = props.emotion.primaryImages[0] ? props.emotion.primaryImages[0] : '';

  const handleCardClick = () => {
    console.log('MoodCard - card clicked');
    props.cardClickHandler();
  }

  return (
    <Grid item xs={3}>
      <Paper className='mood-card-paper' style={getBackgroundStyle(props.emotion)} onClick={() =>  handleCardClick()}>
        <h2 className='modd-card-heading'>{props.emotion.overall}</h2>
        <img className='mood-card-img' src={backgroundImage} alt="dummy" />
        <p className='mood-card-subcategories'>
          <span className='modd-emojis'>{props.emotion.emojis.join(' ')}</span>
          {props.emotion.subCategories.join(', ')}
        </p>
      </Paper>
    </Grid>
  )
}


// Mood test component
function MoodTest() {
  let { testId } = useParams();
  const navigate = useNavigate();

  // handle view test results button click
  const handleViewResultsClick = () => {
    navigate(`/moodchecker/results/${testId}`);
  }


  const handleUserCardSelection = async (emotion) => {
    console.log('User card selected');
    const BE_API = `${BE_HOST}/captureGame/${testId}`;

    // validate emotion data and set form data
    if (!emotion || !emotion.zone || !emotion.overall || !emotion.subCategories || !emotion.emojis) {
      console.error('Invalid emotion data');
      return;
    }
    const formData = {
      "user": "AnonimusA",
      "mood": emotion.overall,
      "feeling": emotion.subCategories.join(',')
    };

    // send data to BE
    try {
      const response = await fetch(BE_API, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify(formData)
        ,
      });
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <p>testid:{testId}</p>
      <Grid className="mood-test-container" container direction="row" justifyContent="center" alignItems="center" spacing={2}>
        {emotions.map(emotion =>
          <MoodCard key={emotion.zone} emotion={emotion} cardClickHandler={() => handleUserCardSelection(emotion)} />
        )}
        <Button variant="contained" onClick={handleViewResultsClick}>View Results</Button>
      </Grid>
    </>
  )
}


// Main component - TeamMoodTracker
export default function TeamMoodTracker() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BeginMoodCheckIn />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route path="/moodchecker" element={<BeginMoodCheckIn />} />
        <Route path="/moodchecker/:testId" element={<MoodTest />} />
        <Route path="/moodchecker/results/:testId" element={<MoodTestResults />} />
      </Routes>
    </BrowserRouter>
  )
}
