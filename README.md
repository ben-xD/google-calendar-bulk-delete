# Google Calendar Bulk Delete - currently in progress
Want to delete lots of events from your calendar based on a specific property? The website doesn't support it. This node app does! It is a typed and promisified version of the Google Calendar NodeJS [quickstart guide](https://developers.google.com/calendar/quickstart/nodejs), which also includes an additional function to delete events based on ID.

Getting started:
- You need [NodeJS](https://nodejs.org/)
- Currently, you need a credentials.json (generated from https://developers.google.com/calendar/quickstart/nodejs)
- You need to generate a token.json file by running `npm start`: contains your access and refress tokens
- Programmatically choose IDs to delete

// TODO
Finish todos in index.ts
Create a custom credentials.json for this library, using ClientID (without secret)
add bad token checking: e.g. insufficient scope, expired token, corrupted token
Custom search string, to search through descriptions of events, returning array of event objects
Publish on NPM
