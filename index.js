const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();
const spotify = new SpotifyWebApi();
spotify.setAccessToken(process.env.SPOTIFY_API_TOKEN);

app.get('/', async (req, res) => {

    try {
        const { body: nowPlaying } = await spotify.getMyCurrentPlaybackState();
        if (nowPlaying['is_playing']) {

            if (nowPlaying.item && nowPlaying.item.name && nowPlaying.item.artists) {
                const track = nowPlaying.item.name;
                const artists = nowPlaying.item.artists.map(artist => artist.name).join(', ');
                res.send({
                    "frames": [
                        {
                            "text": `${track} - ${artists}`,
                            "icon": "i647"
                        }
                    ]
                });
            }
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});