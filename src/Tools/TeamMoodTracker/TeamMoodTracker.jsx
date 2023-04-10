import React from 'react'
import { Grid, Paper, Button, TextField } from "@mui/material";
import { 
  useParams, Route, Routes, BrowserRouter, Link
} from "react-router-dom";
import './TeamMoodTracker.css';
import { emotions } from './Emotions.js';
import BeginMoodCheckIn from './BeginMoodCheckIn';





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
  return (
    <Grid item xs={3}>
      <Paper className='mood-card-paper' style={getBackgroundStyle(props.emotion)}>
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
  return (
    <>
      <p>testid:{testId}</p>
      <Grid className="mood-test-container" container direction="row" justifyContent="center" alignItems="center" spacing={2}>
        {emotions.map(emotion =>
          <MoodCard key={emotion.zone} emotion={emotion} />
        )}
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
        <Route path="/moodchecker" element={<BeginMoodCheckIn />} />
        <Route path="/moodchecker/:testId" element={<MoodTest />} />
      </Routes>
    </BrowserRouter>
  )
}
