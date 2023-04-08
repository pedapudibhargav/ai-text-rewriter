import React from 'react'
import { Grid, Paper, Button, TextField } from "@mui/material";
import './TeamMoodTracker.css';
import { emotions } from './Emotions.js';

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
        <h1 className='modd-card-heading'>{props.emotion.overall}</h1>
        <img className='mood-card-img' src={backgroundImage} alt="dummy" />
        <p className='mood-card-subcategories'>
          <span className='modd-emojis'>{props.emotion.emojis.join(' ')}</span>
          {props.emotion.subCategories.join(', ')}
        </p>
      </Paper>
    </Grid>
  )
}

export default function TeamMoodTracker() {
  return (
    <>
      {/* Moode test begin */}
      <Grid className="begin-test-container" container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={4}>
          <Paper className='beging-test-paper'>
            <p className="tyrnow-subhead">How is your team feeling</p>
            <h2 className="tyrnow-heading">Team Mood Check-Ins</h2>
            <TextField className="tyrnow-team-name" label="Enter your team name" variant="outlined" />
            <Button variant="contained" >Try it for Free</Button>
          </Paper>
        </Grid>
      </Grid>


      {/* Moode test */}
      {/* <Grid container spacing={2}>
        {emotions.map(emotion =>
          <MoodCard key={emotion.zone} emotion={emotion} />
        )}
      </Grid> */}
    </>
  )
}
