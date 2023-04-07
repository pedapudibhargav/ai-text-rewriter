import React from 'react'
import { Grid, Paper } from "@mui/material";

function MoodCard() {
  return (
    <Grid item xs={8}>
      <Paper
        sx={{
          height: 140,
          width: 100,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      />
    </Grid>
  )
}

export default function TeamMoodTracker() {
  return (
    <>
      <div>TeamMoodTracker</div>
      <Grid container spacing={2}>
        <MoodCard />
      </Grid>
    </>
  )
}
