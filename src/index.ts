import { getFutureEvents, getCalendars, deleteEvent } from './calendarModification';
import GoogleAuthenticator from './authenticators';

async function main() {
  // TODO get all calendar IDs for same user token
  const options = {
    tokenPath: 'token.json',
    credentialPath: 'credentials.json',
 }
  
  const authenticator = new GoogleAuthenticator(options);
  const calendar = await authenticator.getUser()
  // const calendars = await getCalendars(calendar);
  // console.log(calendars.map(calendar => ({
  //   id: calendar.id,
  //   name: calendar.summary
  // })))

  const search_string = "Probabilistic inference"
  const calendarId =  "t3jokrcegkltgtod29ubrhihh0@group.calendar.google.com"
  
  // Method 1: Requesting all events, and filtering them locally.
  //   const events = await getFutureEvents(calendar, {
  //     maxResults: 500,
  //     calendarId
  //   });

  // console.info(events.filter(event => event.description.includes(search_string)).map(event => ({
  //   name: event.description.split('\n')[0],
  //   id: event.id
  // })));

  // Method 2: Query cal api with search string
  const events = await getFutureEvents(calendar, {
    maxResults: 500,
    calendarId,
    q: search_string
  });
    console.info(events.map(event => ({
    name: event.description.split('\n')[0],
    id: event.id
  })));

  // rate limited?
  events.map(event => deleteEvent(calendarId, event.id)(calendar))
}

main().catch(err => console.error(err))


// if (events.length) {
// console.log('Upcoming 10 events:');
// events.map((event, i) => {
//   const start = event.start.dateTime || event.start.date;
//   console.log(`${event.id}:${start} - ${event.summary}`);
// });
// } else {
// console.log('No upcoming events found.');
// }
