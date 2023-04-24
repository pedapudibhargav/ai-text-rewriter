import React, { useState, useEffect } from 'react'
import { Grid, Paper, Button, Container } from "@mui/material";
import {
  useParams, Route, Routes, BrowserRouter, useNavigate
} from "react-router-dom";
import './TeamMoodTracker.css';
import { emotions } from './Emotions.js';
import MoodTestResults from './MoodTestResults';
import BeginMoodCheckIn from './BeginMoodCheckIn';
import NewUser from './NewUser';
import ResponsiveAppBar from './ResponsiveAppBar';
import happyImage from './images/moods/happy.png';
import okImage from './images/moods/ok2.png';
import nookImage from './images/moods/notok2.png';
import angryImage from './images/moods/angry2.png';
import ThankYou from './Components/ThankYou';

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
  // const backgroundImage = props.emotion.primaryImages[0] ? props.emotion.primaryImages[0] : '';

  // handle card click
  const handleCardClick = () => {
    console.log('MoodCard - card clicked');
    props.cardClickHandler();
  }


  // return class name for selected card
  const cardSelectedClass = () => {
    const userSelectedEmotion = props.selectedEmotion && props.selectedEmotion.overall ? props.selectedEmotion.overall : '';
    const emotionOfThisCard = props.emotion.overall;
    return (userSelectedEmotion === emotionOfThisCard) ?
      'mood-card-paper mood-card-paper-active' : 'mood-card-paper'
  }

  const getCardImageSrc = (emotionOverall) => {
    switch (emotionOverall) {
      case 'great':
        return happyImage;
      case 'ok':
        return okImage;
      case 'not ok':
        return nookImage;
      case 'bad':
        return angryImage;
      default:
        return happyImage;
    }
  }

  return (
    <Grid item xs={3}>
      <Paper className={cardSelectedClass()} style={getBackgroundStyle(props.emotion)} onClick={() => handleCardClick()}>
        <h2 className='modd-card-heading'>{props.emotion.overall}</h2>
        <img className='mood-card-img' src={getCardImageSrc(props.emotion.overall)} alt={`${props.emotion.overall} image`} />
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
  const [testname, setTestname] = React.useState(localStorage.getItem('testName'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [selectedEmotion, setSelectedEmotion] = React.useState(null);
  let { testId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {    
    if (!username) {
      navigate('/newuser');
    }
  }, []);


  // handle view test results button click
  const handleViewResultsClick = () => {
    navigate(`/moodchecker/results/${testId}`);
  }


  const handleUserCardSelection = async (emotion) => {
    console.log('User card selected', testId);
    setSelectedEmotion(emotion);
    const BE_API = `${BE_HOST}/captureGame/${testId}`;

    // validate emotion data and set form data
    if (!emotion || !emotion.zone || !emotion.overall || !emotion.subCategories || !emotion.emojis) {
      console.error('Invalid emotion data');
      return;
    }
    const formData = {
      "user": username,
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
      <Grid container className="mood-test-grid" spacing={2} direction="column" justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <header className='test-header'>
            {
              (testname && testname !== '') ?
                <h1>{testname}</h1> :
                <h1>How are you feeling today?</h1>
            }
          </header>
        </Grid>
        <Grid item xs={12}>
          <Grid className="mood-test-container" container direction="row" spacing={2}>
            {emotions.map(emotion =>
              <MoodCard key={emotion.zone} selectedEmotion={selectedEmotion} emotion={emotion} cardClickHandler={() => handleUserCardSelection(emotion)} />
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className='mood-test-action-bar'>
            <Button variant="contained" size="large" sx={{ mr: 2 }} onClick={handleViewResultsClick}>View Results</Button>
            <Button variant="contained" size="large" onClick={() => navigate(`/moodchecker/thankyou/${testId}`)}>Submit</Button>
          </div>
        </Grid>
      </Grid>
    </>
  )
}


// Main component - TeamMoodTracker
export default function TeamMoodTracker() {
  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BeginMoodCheckIn />} />
            <Route path="/newuser" element={<NewUser />} />
            <Route path="/moodchecker" element={<BeginMoodCheckIn />} />
            <Route path="/moodchecker/:testId" element={<MoodTest />} />
            <Route path="/moodchecker/results/:testId" element={<MoodTestResults />} />
            <Route path="/moodchecker/thankyou/:testId" element={<ThankYou />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}
