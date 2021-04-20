
// Networking configuration
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    },
    path: "/ws"
  })

// Custom logging library
const logger = require('./logger')

// Spotify library for filtering, retrieving and getting user data
const spotify = require('./spotify')

// Hold onto the filtered data;
var filtered;

// Function to publish and emit requested data
const emit = (data) => {
    filtered = {
        now_playing: data.now_playing.is_playing,
        timestamp: data.now_playing.timestamp,
        item: data.now_playing.item,
        top: {
            artists: data.top_artists,
            tracks: data.top_tracks
        }
    }
    io.emit('refresh', filtered)
}

io.on('connection', function (socket) {
    socket.emit('refresh', filtered);
});

// Instantiate the Spotify library
spotify.instantiate(emit);

app.post('/code', (req, res) => {
    if (req.query.code && req.query.code.length > 0) {
        spotify.poll(req.query.code)
        res.status(200).send('Received code')
    } else {
        res.status(400).send('No code received')
    }
})

app.get('/data', (req, res) => {
    res.status(200).send(filtered)
})

// Store the port to listen on
const port = process.env.PORT || 80

// Start listening to requests
http.listen(port);
logger.info(`Spotapi service started and listening to ${port}`)