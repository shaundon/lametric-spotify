const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();

const { 
    CLIENT_ID: clientId, 
    CLIENT_SECRET: clientSecret 
} = process.env;

if (!clientId || !clientSecret) {
    console.error(`Set CLIENT_ID and CLIENT_SECRET as env vars. Exiting..`);
    process.exit(1);
}

const spotify = new SpotifyWebApi({
    clientId,
    clientSecret,
    redirectUri: 'https://developer.lametric.com/redirect'
});

let allowedDevices = process.env.ALLOWED_DEVICES;

if (allowedDevices) {
    allowedDevices = allowedDevices.split(',');
    console.log(`Setting allowed devices to ${allowedDevices.join(',')}`);
}

app.get('/', async (req, res) => {
    console.log(req.get['authorization']);
    console.log(req.headers);
    if (!req.get['authorization']) {
        res.status(400).send(`Missing authorization header.`);
    }

    const authToken = req.get['authorization'].split('Bearer ')[1];
    spotify.setAccessToken(authToken);
    
    // try {
    //     const { access_token } = await spotify.authorizationCodeGrant(auth_code_0);
    //     spotify.setAccessToken(process.env.SPOTIFY_API_TOKEN);
    // } catch (err) {
    //     res.status(500).send(`Error getting access token`, err);
    // }

    try {
        const { body: nowPlaying } = await spotify.getMyCurrentPlaybackState();
        let responseText = '-';
        if (nowPlaying['is_playing'] && nowPlaying.item && nowPlaying.item.name && nowPlaying.item.artists) {
            const track = nowPlaying.item.name;
            const artists = nowPlaying.item.artists.map(artist => artist.name).join(', ');
            responseText = `${track} - ${artists}`;
            if (allowedDevices && !allowedDevices.includes(nowPlaying.device.name)) {
                responseText = '-';
            }
        }
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