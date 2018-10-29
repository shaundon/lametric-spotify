const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

app.get('/', async (req, res) => {
    console.log(req.headers.authorization);
    console.log(req.headers);
    if (!req.headers.authorization) {
        res.status(400).send(`Missing authorization header.`);
    }

    const authToken = req.headers.authorization.split('Bearer ')[1];
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(authToken);

    let allowedDevices = req.query.devices;
    if (allowedDevices) {
        console.log(`Setting allowed devices to ${allowedDevices}.`);
        allowedDevices = allowedDevices.split(',');
    }

    try {
        const { body: nowPlaying } = await spotify.getMyCurrentPlaybackState();
        let responseText = '';
        if (nowPlaying['is_playing'] && nowPlaying.item && nowPlaying.item.name && nowPlaying.item.artists) {
            const track = nowPlaying.item.name;
            const artists = nowPlaying.item.artists.map(artist => artist.name).join(', ');
            responseText = `${track} - ${artists}`;
            if (allowedDevices && !allowedDevices.includes(nowPlaying.device.name)) {
                responseText = '-';
            }
        }
        console.log(responseText);
        res.status(200).send({
            "frames": [
                {
                    "text": responseText,
                    "icon": "i647" // Spotify logo.
                }
            ]
        });
    } catch (err) {
        console.error(err);
        res.status(err.statusCode).send(err.message);
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});