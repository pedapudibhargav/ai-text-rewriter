// ./src/index.js
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();

// data storage to store team mood app data
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

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
    res.send(ads);
});


// POST API to capture game data with security measures
app.post('/captureGame/:gameId', (req, res) => {
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
app.get('/api/v1/newgame', (req, res) => {
    console.log('Entering new game API');
    const gameId = req.query.gameId;
    teamMoodData["moodtest"][`T-${gameId}`] = {
        "organizers": [],
        "results": {}
    };
    return res.status(200).json({ message: "Game created!", teamMoodData: teamMoodData });
});


// Get API to get game results
app.get('/api/v1/allgames', (req, res) => {
    console.log('Entering all games API');
    return res.status(200).json(teamMoodData);
});


// Get API to get game results
app.get('/api/v1/moodtest/results', (req, res) => {
    console.log('Entering game results API');
    const gameId = req.query.gameId;
    if(!teamMoodData["moodtest"][`T-${gameId}`])
        return res.status(404).json({ error: `Game not found: T-${gameId}` });
    const results = teamMoodData["moodtest"][`T-${gameId}`];
    return res.status(200).json(results);
});


// starting the server
app.listen(3002, () => {
    console.log('listening on port 3002');
});