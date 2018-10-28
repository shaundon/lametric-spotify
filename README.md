# LaMetric Spotify

## About

Back end for a [LaMetric Time](https://lametric.com/) to poll and get now playing info for your Spotify account.

## Rationale and use case

I use an Amazon Echo in my kitchen to listen to music a lot. I also have a LaMetric Time in there. I thought it would be cool to display the currently playing song on it. I hoped that this would already exist, but unfortunately it doesn't (there is an IFTTT trigger for Amazon Echo 'now playing' changing, but it currently only works with Prime Music).

So, this is my hack to get this functionality.

### Specific speakers

As this is linked directly to Spotify and not my Amazon Echo, it will display my now playing info even if I'm out and about. Some people might find this desirable but I don't want this functionality, as I want it to be local to the home. 

So, there's extra logic to have it only return a result if the speaker that Spotify is playing from matches a predefined list. To do this, set the `ALLOWED_DEVICES` environment variable. It's a comma-separated list, so you can specify multiple
speakers or groups, e.g. `ALLOWED_DEVICES=Kitchen,Downstairs,Living Room`.

## Prerequisites

* Spotify client ID and client secret. Get this from their developer website.
* LaMetric developer account. You'll need to publish this as a private app and install it onto your device.
* Somewhere to deploy this back end - e.g. Heroku.

## Install

```
npm install
```

## Run

```
CLIENT_ID='client id' CLIENT_SECRET='client secret' npm start
```

You'll need to send a Spotify authorisation key linked to your account with your requests. To do this, go to `/auth` and you'll be given a URL you can go to to authenticate. After authenticating, the callback URL will have a code as a GET param. Take this code and then send it as a GET param to `/` in your requests, for example `http://localhost:3000?auth_token_0=your_code_here.

## Future

I want to make it support multiple API keys, so that if one account isn't listening to music I can check another. This is so that multiple people living in the same household can use this app.