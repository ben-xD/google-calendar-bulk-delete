import { getFutureEvents, getCalendars, deleteEvent } from './calendarModification';
import GoogleAuthenticator from './authenticators';
import * as rl from 'readline-sync'

async function main() {
  const options = {
    tokenPath: 'token.json',
    credentialPath: 'credentials.json',
 }

 // User should set this, OR interactively modify them with `npm start`
 let searchString = "CO304 Logic-Based Learning"
 let calendarId =  "t3jokrcegkltgtod29ubrhihh0@group.calendar.google.com"
  
 const authenticator = new GoogleAuthenticator(options);
 const calendar = await authenticator.getUser()
 const defaultInput = rl.question("Do you want to change your calendarID or search string from the default set in index.ts? (Only 'y' & 'yes' will confirm (case insensitive).)");
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
 }

  const events = await getFutureEvents(calendar, {
    maxResults: 500,
    calendarId,
    q: searchString
  });
  console.info(events.map(event => ({
    name: event.summary,
    id: event.id
  })));

  if (events.length == 0) {
    console.log("No events exist under this search string and calendar ID. (You may have multiple 'calendars' in your calendar.")
    return;
  }

  const deleteString = rl.question('Do you want to delete ALL events shown above? (Only y, yes will confirm (case insensitive).)');
  if ((deleteString.toLowerCase() == "yes" || deleteString.toLowerCase() == "y")) {
    console.log("Confirmed, deleting events: ")
    // is this slowing it down? Try Promise.all()
    const deletions = events.map(async (event) => await deleteEvent(calendarId, event.id)(calendar))
    await Promise.all(deletions)
    console.info("All delelitions complete.")
  }
}

main().catch(err => console.error(err))