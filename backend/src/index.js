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

    // Check if game exists
    if (!gameId || !teamMoodData["moodtest"][`T-${gameId}`]) {
        return res.status(404).json({ error: `Game not found: T-${gameId}` });
    }

    // Validate input data
    if (!userSelection || !userSelection.user || !userSelection.mood || !userSelection.feeling) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    // Check if player is a valid player in the game
    if (!gamesData[gameId].players.includes("U-bhargav")) {
        return res.status(403).json({ error: "You are not a valid player in this game" });
    }

    // Capture player data
    gamesData[`T-${gameId}`].results[`U-${userSelection.user}`] = userSelection;

    // Return success response
    return res.status(200).json({ message: "Player data captured successfully" });
});


// POST API to capture game data with security measures
app.put('/captureGame/:gameId', (req, res) => {
    teamMoodData["moodtest"][`T-${gameId}`] = {
        "organizers": [],
        "results": {}
    };
    return res.status(200).json({ message: "Game created!" });
});


// starting the server
app.listen(3002, () => {
    console.log('listening on port 3002');
});