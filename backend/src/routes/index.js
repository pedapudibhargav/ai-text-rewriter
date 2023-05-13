const express = require("express");
const router = express.Router();
const apiRouter = express.Router();

const teamMoodData = {
    "moodtest": {
      "T-lga6vyzqoriwd": {
        "organizers": [],
        "results": {
          "U-bhargav": {
            "user": "bhargav",
            "mood": "happy",
            "feeling": ""
          },
          "U-EmmaWatson": {
            "user": "EmmaWatson",
            "mood": "great",
            "feeling": "happy,excited,calm,okay,focused"
          },
          "U-RobertDowneyJr": {
            "user": "RobertDowneyJr",
            "mood": "ok",
            "feeling": "neutral,moderate,stable,composed,content"
          },
          "U-ScarlettJohansson": {
            "user": "ScarlettJohansson",
            "mood": "not ok",
            "feeling": "sad,depressed,sick,tired,uncomfortable"
          },
          "U-BradPitt": {
            "user": "BradPitt",
            "mood": "bad",
            "feeling": "upset,frustrated,furious,mad,angry"
          },
          "U-JenniferLawrence": {
            "user": "JenniferLawrence",
            "mood": "great",
            "feeling": "happy,excited,calm,okay,focused"
          },
          "U-LeonardoDiCaprio": {
            "user": "LeonardoDiCaprio",
            "mood": "ok",
            "feeling": "neutral,moderate,stable,composed,content"
          },
          "U-MilaKunis": {
            "user": "MilaKunis",
            "mood": "not ok",
            "feeling": "sad,depressed,sick,tired,uncomfortable"
          },
          "U-ChrisHemsworth": {
            "user": "ChrisHemsworth",
            "mood": "bad",
            "feeling": "upset,frustrated,furious,mad,angry"
          },
          "U-NataliePortman": {
            "user": "NataliePortman",
            "mood": "ok",
            "feeling": "neutral,moderate,stable,composed,content"
          },
          "U-TomHanks": {
            "user": "TomHanks",
            "mood": "great",
            "feeling": "happy,excited,calm,okay,focused"
          }
        }
      }
    }
  };
  
// defining an endpoint to return all ads
apiRouter.get('/', (req, res) => {
    res.send('Worked 🔥🔥🔥🔥🔥🔥!!!!');
});


// POST API to capture game data with security measures
apiRouter.post('/captureGame/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    const userSelection = req.body;

    console.log(`----------${JSON.stringify(req.body)}----------`);
    // Check if game exists
    if (!gameId || !teamMoodData["moodtest"][`T-${gameId}`]) {
        return res.status(404).json({ error: `Game not found: T-${gameId}` });
    }

    // Validate input data
    if (!userSelection || !userSelection.user || !userSelection.mood || !userSelection.feeling) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    // Capture player data
    let GameFound = teamMoodData["moodtest"][`T-${gameId}`];
    console.log(`----------${JSON.stringify(GameFound)}----------   `);

    teamMoodData["moodtest"][`T-${gameId}`]["results"][`U-${userSelection.user}`] = userSelection;

    // Return success response
    return res.status(200).json({ message: "Player data captured successfully" });
});


// Get API to capture new game
apiRouter.get('/api/v1/newgame', (req, res) => {
    console.log('Entering new game API');
    const gameId = req.query.gameId;
    const organizer = req.query.organizer ? req.query.organizer : "";
    teamMoodData["moodtest"][`T-${gameId}`] = {
        "organizers": [organizer],
        "results": {}
    };
    return res.status(200).json({ message: "Game created!", teamMoodData: teamMoodData });
});


// Get API to get game results
apiRouter.get('/api/v1/allgames', (req, res) => {
    console.log('Entering all games API');
    return res.status(200).json(teamMoodData);
});


// Get API to get game results
apiRouter.get('/api/v1/moodtest/results', (req, res) => {
    console.log('Entering game results API');
    const gameId = req.query.gameId;
    //validation
    if (!teamMoodData["moodtest"][`T-${gameId}`])
        return res.status(404).json({ error: `Game not found: T-${gameId}` });

    let results = teamMoodData["moodtest"][`T-${gameId}`].results;
    console.log(`\n\n----------${JSON.stringify(results)}----------\n\n`);
    let users = [];
    const moodCount = { 'great': 0, 'ok': 0, 'not ok': 0, 'bad': 0 };
    // Calculate mood count and seperates users info from their choices
    for (const key in results) {
        const mood = results[key].mood;
        if (!moodCount[mood])
            moodCount[mood] = 0;
        moodCount[mood]++;
        users.push(results[key].user);
    }

    return res.status(200).json({
        results: moodCount,
        users: users
    });
});


// Get organizer's name of a game
apiRouter.get('/v1/moodtest/organizer/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    if (!teamMoodData["moodtest"][`T-${gameId}`])
        return res.status(404).json({ error: `Game not found: T-${gameId}` });

    const moodTestData = teamMoodData["moodtest"][`T-${gameId}`];
    const organizers = moodTestData.organizers;
    if (!organizers || organizers === 0)
        return res.status(200).json(['anonymous']);

    return res.status(200).json(moodTestData.organizers);
});

module.exports = apiRouter;