import React, { useState, useEffect } from 'react'
import { Grid, Paper, Button, Typography } from "@mui/material";
import {
  useParams, useNavigate
} from "react-router-dom";
import './TeamMoodTracker.css';
import { emotions } from './Emotions.js';
import happyImage from './images/moods/happy.png';
import okImage from './images/moods/ok2.png';
import nookImage from './images/moods/notok2.png';
import angryImage from './images/moods/angry2.png';
import SendIcon from '@mui/icons-material/Send';
import DoneIcon from '@mui/icons-material/Done';

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
        {/* <h2 className='modd-card-heading'>{props.emotion.overall}</h2> */}
        <img className='mood-card-img' src={getCardImageSrc(props.emotion.overall)} alt={`${props.emotion.overall} image`} />
        <p className='mood-card-subcategories'>
          <span className='modd-emojis'>{props.emotion.emojis.join(' ')}</span><br/>
          <span className='mood-eomjis-description'>{props.emotion.subCategories.join(', ')}</span>
        </p>
      </Paper>
    </Grid>
  )
}


// Mood test component
function MoodTest() {
  const [testname, setTestname] = React.useState(localStorage.getItem('testName'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [enableCopiedView, setEnableCopiedView] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = React.useState(null);
  let { testId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    if (!username) {
      console.log('redirecting to newuser page.... from TeamMoodTracker');
      navigate('/newuser', { state: { from: `/moodchecker/${testId}` } });
    }
    getOrganizerName();
  }, []);

  const getOrganizerName = () => {
    const BE_API = `${BE_HOST}/v1/moodtest/organizer/${testId}`;
    fetch(BE_API).then(response => response.json()).then(data => {
      data.includes(username) ? setIsOrganizer(true) : setIsOrganizer(false);
    });
  }

  // handle view test results button click
  const handleViewResultsClick = () => {
    navigate(`/moodchecker/results/${testId}`);
  }


  // handle share button click
  const handleShareButtonClick = () => {
    const shareUrl = `${window.location.origin}/moodchecker/${testId}`;
    console.log(`Copied URL:${shareUrl}`);
    navigator.clipboard.writeText(shareUrl);
    setEnableCopiedView(true);
    setTimeout(() => {
      setEnableCopiedView(false);
    }, "1500");
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
      navigate(`/moodchecker/thankyou/${testId}`)
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <Grid container className="mood-test-grid" spacing={2} direction="column" justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <header className='test-header'>
            {/* {
              (testname && testname !== '') ?
                <h1>{testname}</h1> :
                <h1>How are you feeling today?</h1>
            } */}
            <Typography variant="body1" sx={{ fontSize: '1.3rem', mb: 2, mt:2 }} gutterBottom>
              Choose the card that best represents your current mood.
            </Typography>
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
            {
              isOrganizer ?
                <Button variant="contained" size="large" sx={{ mr: 2 }} onClick={handleViewResultsClick}>View Results</Button> :
                null
            }
            <Button variant="outlined" size="large" onClick={handleShareButtonClick} endIcon={enableCopiedView ? <DoneIcon /> : <SendIcon />}>
              {enableCopiedView ? 'Copied' : 'Share'}
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export {
  MoodTest,
  MoodCard,
}