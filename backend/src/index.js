// ./src/index.js
// importing the dependencies
const express = require('express');
const expressWs = require('express-ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const apiRouter = require("./routes/index");
const http = require("http");
const socketIo = require("socket.io");
const webSocketServer = require("./websockets/websocket");

// defining the Express app
const app = express();
// adding Helmet to enhance your Rest API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow access from multiple origins
const allowedOrigins = ['http://localhost:3000', 'https://pedapudibhargav.github.io', 'https://mindtune.appnirvana.co'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
/** --------------- Regular API code ---------------------- */
// adding morgan to log HTTP requests
app.use(morgan('combined'));
// Mount the API router with the '/api' prefix:
app.use('/api', apiRouter);


const server = webSocketServer(app, allowedOrigins);

// starting the server
server.listen(3002, () => {
  console.log('listening on port 3002');
});