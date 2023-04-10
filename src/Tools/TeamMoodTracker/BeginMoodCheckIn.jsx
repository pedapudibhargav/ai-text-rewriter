import React from 'react';
import { Grid, Paper, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function BeginMoodCheckIn() {
    const [uniqueNumber, setUniqueNumber] = useState(Date.now().toString(36) + Math.random().toString(36).substring(2, 7));
    const handleNewTestClick = () => {
        // fetch
    }
    return (
      <Grid className="begin-test-container" container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={4}>
          <Paper className='beging-test-paper'>
            <p className="tyrnow-subhead">How is your team feeling</p>
            <h2 className="tyrnow-heading">Team Mood Check-Ins</h2>
            <TextField className="tyrnow-team-name" label="Enter your team name" variant="outlined" />
            <Button variant="contained" size="large" component={Link} to={`/moodchecker/${uniqueNumber}`} >Try it for Free</Button>
          </Paper>
        </Grid>
      </Grid>
    )
}