<!-- omit in toc -->
# Google Calendar Bulk Delete
Want to delete lots of events from your calendar based on a specific event property? The website doesn't support it. This node app does! It is a typed and promisified version of the Google Calendar NodeJS [quickstart guide](https://developers.google.com/calendar/quickstart/nodejs), which also includes an additional function to delete events based on ID.

<!-- omit in toc -->
## Contents
- [Example](#example)
- [Known issues](#known-issues)

## Example
There is an interactive program, `example.ts` which guides you along to deleting events in bulk via the command line. 
- Install Node, dependencies (`npm i`), run the program `npm start`
- Enable Google Calendar API for your account, which effectively creates you a personal app (`credentials.json`). There is no data at risk here, as you have created an app. It doesn't yet have permission to access anyones data.
- Run `npm start`
- Then, you authorize your app (above) to gain access to your calendar account, by opening the link (`token.json`). You need to generate a credentials.json (step 1) and place it in the repo folder 
- You need to generate a token.json file by running `npm start`: contains your access and refress tokens
- Programmatically choose IDs to delete
![Terminal screenshot](https://i.imgur.com/Z5YHj6t.png "Example 1")

## Known issues
- You cannot see input into command line, when launching `npm start` for the first time (no token.json yet). Input still works though.