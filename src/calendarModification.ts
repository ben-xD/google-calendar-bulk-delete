import {calendar_v3} from 'googleapis';

interface Options {
  calendarId?: string,
  timeMin?: string,
  maxResults?: number,
  singleEvents?: boolean,
  orderBy?: string,
}

const defaultOptions: Options = {
  calendarId: 'primary',
  timeMin: (new Date()).toISOString(),
  maxResults: 10,
  singleEvents: true,
  orderBy: 'startTime',
}

async function getFutureEvents(calendar: calendar_v3.Calendar, options: Options) {
  return new Promise((resolve, reject) => {
    calendar.events.list({
      ...defaultOptions,
      ...options
    }, (err, res) => {
      if (err) reject(Error(`The API returned an error: ${err}`));
      resolve(res.data.items);
    });
  });
}

const deleteEvent = (UID) => (calendar) => {
  calendar.events.delete({
    calendarId: 'primary',
    eventId: UID,
  }, (err, res) => {
    if (err) return console.log(`The event delete API returned an error: ${err}`);
    console.log('Finished deleting 1 event');
  });
};

export { deleteEvent, getFutureEvents };

// const filesmap = JSON.parse(fs.readFileSync('uidsCorrect.json'));
// for (i in filesmap) {
//   const uid = filesmap[i];
//   setTimeout(() => deleteEvent(uid), i * 250);
// }
