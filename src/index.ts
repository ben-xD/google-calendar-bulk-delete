import { calendar_v3 } from 'googleapis';
import { getFutureEvents, getCalendars, deleteEvent } from './calendarModification';
import GoogleAuthenticator from './authenticators';
import * as savedUserState from '../state.json'
import * as fs from 'fs'
import * as rl from 'readline-sync'

async function main() {
  const options = {
    tokenPath: 'token.json',
    credentialPath: 'credentials.json',
  }

  const savedUserState = JSON.parse(fs.readFileSync('state.json').toString());
  let searchString = savedUserState.searchString
  let calendarId = savedUserState.calendarId
  console.log(`I will only search for events with '${searchString}' (searchString) in '${calendarId}'(calendarId) (set in state.json).`)

  const authenticator = new GoogleAuthenticator(options);
  let calendar: calendar_v3.Calendar;

  try {
    calendar = await authenticator.getCalendar()
  } catch (err) {
    console.error(err);
    console.error("Have you tried deleting token.json, and regenerating another one.")
    return
  }

  const defaultInput = rl.question("Do you want to change your calendarID or search query? (Only 'y' & 'yes' will confirm (case insensitive).)");
  if (defaultInput.toLowerCase() == "yes" || defaultInput.toLowerCase() == "y") {
    console.log("Below are the calendars available from 'credentials.json'");

    // Get and list calendars in credentials.json
    const calendars = await getCalendars(calendar);
    console.log(calendars.map(calendar => ({
      id: calendar.id,
      name: calendar.summary
    })))

    calendarId = rl.question("Enter id for the calendar you want to delete events from: ");
    searchString = rl.question("Enter string to search events by: ")

    const saveSearchInput = rl.question("Saving calendarID. Do you want to save your search string too?: ")

    if (saveSearchInput.toLowerCase() == "yes" || saveSearchInput.toLowerCase() == "y") {
      fs.writeFileSync(
        'state.json',
        JSON.stringify({
          ...savedUserState,
          calendarId,
          searchString
        }))
    } else {
      fs.writeFileSync('state.json', JSON.stringify({
        ...savedUserState,
        calendarId
      }))
    }
  }

  const events = await getFutureEvents(calendar, {
    maxResults: 250,
    calendarId,
    q: searchString
  });
  console.info(events.map(event => event.summary));

  if (events.length == 0) {
    console.log("No events exist under this search string and calendar ID. (You may have multiple 'calendars' in your calendar, choose the correct ID.)")
    return;
  }

  const deleteString = rl.question('Do you want to delete ALL events shown above? (Only y, yes will confirm (case insensitive).)');
  if ((deleteString.toLowerCase() == "yes" || deleteString.toLowerCase() == "y")) {
    console.log("Confirmed, deleting events: ")
    // is this slowing it down? Try Promise.all()
    const deletions = events.map(async (event) => await deleteEvent(calendarId, event.id)(calendar))
    await Promise.all(deletions)
    console.info("All deletions complete.")
  }
}

// The entry point, if running node-ts index.ts. Won't be run if a package.
main().catch(err => console.error(err))