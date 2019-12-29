import { google } from 'googleapis';

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log(`The API returned an error: ${err}`);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        // console.info(event);
        const start = event.start.dateTime || event.start.date;
        console.log(`${event.id}:${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
}

const deleteEvent = (UID) => (auth) => {
  const calendar = google.calendar({ version: 'v3', auth });
  calendar.events.delete({
    calendarId: 'primary',
    eventId: UID,
  }, (err, res) => {
    if (err) return console.log(`The event delete API returned an error: ${err}`);
    console.log('Finished deleting 1 event');
  });
};

export { deleteEvent, listEvents };

// const filesmap = JSON.parse(fs.readFileSync('uidsCorrect.json'));
// for (i in filesmap) {
//   const uid = filesmap[i];
//   setTimeout(() => deleteEvent(uid), i * 250);
// }
