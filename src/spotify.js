var SpotifyWebApi = require('spotify-web-api-node');
const logger = require('./logger')
var fs = require("fs");

// Cache of statistics
var publish;
var now_playing;
var top_artists;
var top_tracks;
var loop;

// // Read the environment file
const dotenv = require('dotenv');
dotenv.config();

/*  
    A client ID and a client secret are required for usage of this library, 
    the SPOTIFY_REDIRECT_URI is a url to pass the token through to via a url parameter, 
    see https://developer.spotify.com/documentation/general/guides/app-settings/
*/
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

// Create the authorization URL
logger.info(spotifyApi.createAuthorizeURL(['user-library-read', 'user-top-read', 'user-read-playback-state', 'user-read-currently-playing']));
logger.info("Please POST the received code to /code to commence searching");

const poll = (code) => {

    clearInterval(loop);

    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then((data) => {

        logger.info('Token retrieved and expires in ' + data.body['expires_in']);

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);

        loop = setInterval(async () => {

            // Get information about the top tracks for the signed in user
            top_tracks = await spotifyApi.getMyTopTracks()
                .then((data) => data.body)
                .catch((err) => {logger.error('Something went wrong retrieving top tracks, code: ', err.statusCode)});

            // Get information about the top artists for the signed in user
            top_artists = await spotifyApi.getMyTopArtists()
                .then((data) => data.body)
                .catch((err) => {logger.error('Something went wrong retrieving top artists, code: ', err.statusCode)});

            // Get information about current playing song for signed in user
            now_playing = await spotifyApi.getMyCurrentPlaybackState()
                .then((data) => data.body)
                .catch((err) => {logger.error('Something went wrong retrieving now playing, code: ', err.statusCode)});

            publish({ now_playing, top_artists, top_tracks });

        }, process.env.REFRESH_RATE || 10000);

        refresh_interval = setInterval(() => spotifyApi.refreshAccessToken()
            .then((data) => {
                logger.info('The access token has been refreshed');
                spotifyApi.setAccessToken(data.body['access_token']);
            })
            .catch((err) => {
                logger.error('Could not refresh access token', err);
            }), (data.body['expires_in'] * 1000) - 60);

    })
        .catch((err) => logger.error('Something went wrong with the authorization code. Are you reusing a code? That isn\'t allowed!', err));
}

module.exports = {
    instantiate: (cb) => {
        publish = cb;
    },
    poll
};