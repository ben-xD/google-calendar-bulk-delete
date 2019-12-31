# Delete calendar events - currently in progress
Did you accidentally add lots of events to your google calendar? Tweak this script, to programmatically delete unwanted events.

Typed and promisified version of the Google Calendar NodeJS quickstart guide https://developers.google.com/calendar/quickstart/nodejs

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
