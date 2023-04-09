// Networking configuration
const express = require('express');
const app = express();

// Generate a shared HTTP API server and WS server using Socket IO
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    },
    path: "/ws"
});

// Custom logging library
const logger = require('./logger');

// Spotify library for filtering, retrieving and getting user data
const spotify = require('./spotify');
const { isNull } = require('util');

// Hold onto the filtered data;
var filtered = {};

// Accepts a key and safely attempts to override it in a target object
// if the property exists in the source object
const assignIfExists = (key, target, source) => {
    target[key] = source[key] === null ? filtered[key] : source[key];
}

// Function to publish and emit requested data
const emit = (data) => {
    Object.keys(data).map((key) => assignIfExists(key, filtered, data));
    io.emit('update', filtered);
}

io.on('connection', function (socket) {
    
    logger.info(`New connection from ${socket.handshake.address}`);
    
    socket.on('immediate_refresh_request', () => {
        logger.info(`Immediate update request from ${socket.handshake.address}`);
        return filtered;
    });

    socket.on('disconnect', () => {
        logger.info(`Disconnected ${socket.handshake.address}`);
    });

});

// Instantiate the Spotify library
spotify.instantiate(emit);

app.get('/code', (req, res) => {
    if (req.query.code && req.query.code.length > 0) {
        spotify.poll(req.query.code);
        res.status(200).send('Received code');
    } else {
        res.status(400).send('No code received');
    }
})

app.get('/data', (req, res) => {
    res.status(200).send(filtered);
})

// Store the port to listen on
const port = process.env.PORT || 80;

// Start listening to requests
http.listen(port);
logger.info(`Spotapi service started and listening to ${port}`);