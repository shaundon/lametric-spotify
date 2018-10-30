# LaMetric Spotify

## About

Back end for a [LaMetric Time](https://lametric.com/) app to poll and get now playing info for your Spotify account.

## Rationale and use case

I use an Amazon Echo in my kitchen to listen to music a lot. I also have a LaMetric Time in there. I thought it would be cool to display the currently playing song on it. I hoped that this would already exist, but unfortunately it doesn't (there is an IFTTT trigger for Amazon Echo 'now playing' changing, but it currently only works with Prime Music).

So, this is my hack to get this functionality.

### Specific speakers

As this is linked directly to Spotify, it will display your now playing info even if you're not at home.

To only return a result when the speaker that Spotify is playing from matches a predefined list, send `devices` as a query param with your requests. It's a comma-separated list, so you can specify multiple speakers or groups, e.g. `devices=Kitchen,Downstairs,Living Room`

## Install

```
npm install
```

## Run

```
npm start
```

## Other things to do

### Spotify

On Spotify's [developer dashboard](https://developer.spotify.com), create an app. Use `https://developer.lametric.com/redirect` for the redirect URL, and make a note of the client ID and client secret.

### LaMetric

Go to the [developer portal](https://developer.lametric.com/) and sign in. Then, create an app. You'll need it to poll this back end every X seconds.

Use these settings for your app:

URL to be polled: URL of wherever you host this app - e.g. Heroku or AWS.
Authentication: Choose `OAuth2` and select `Spotify`. There you'll able to enter your client ID and client secret from Spotify.  
Scope: `user-read-playback-state`
Send in both body and headers

If you'd like to make use of the 'allowed devices` functionality mentioned earlier, add this as a parameter to the app too.

Now, install this app on your LaMetric Time and log into Spotify.

