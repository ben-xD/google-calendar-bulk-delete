import { getFutureEvents } from './calendarModification';
import GoogleAuthenticator from './authenticators';

async function main() {
  // TODO get all calendar IDs for same user token
  const authenticator = new GoogleAuthenticator();
  // TODO new calendarID parameter
  const calendar = await authenticator.getCalendar();
  const events = await getFutureEvents(calendar, {
    maxResults: 1,
  });

  console.info({events});

  // TODO iterate over each event, searching in Summary, for "Graphics", store ids.
  // TODO delete event by id.
  
  // deleteEvent('14hu0v3pimjrgr77c2fqiket2c')(calendar);
}

// TODO remove
main()


// if (events.length) {
// console.log('Upcoming 10 events:');
// events.map((event, i) => {
//   const start = event.start.dateTime || event.start.date;
//   console.log(`${event.id}:${start} - ${event.summary}`);
// });
// } else {
// console.log('No upcoming events found.');
// }
