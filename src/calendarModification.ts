import {calendar_v3} from 'googleapis';

const defaultOptions: calendar_v3.Params$Resource$Events$List = {
  calendarId: 'primary',
  timeMin: (new Date()).toISOString(),
  maxResults: 10,
  singleEvents: true,
  orderBy: 'startTime',
}

async function getFutureEvents(calendar: calendar_v3.Calendar, options: calendar_v3.Params$Resource$Events$List): Promise<calendar_v3.Schema$Event[]> {
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

const deleteEvent = (calendarId: string, UID: string) => (calendar: calendar_v3.Calendar): Promise<void> => {
  return new Promise((resolve, reject) => {
    calendar.events.delete({
      calendarId,
      eventId: UID,
    }, (err, res) => {
      if (err) return reject(Error(`The event delete API returned an error: ${err}`));
      resolve(console.log('Finished deleting 1 event'));
    });
  })
};

const getCalendars = async (calendar: calendar_v3.Calendar) => {
  const response = await calendar.calendarList.list();
  return response.data.items;
}

export { getCalendars, deleteEvent, getFutureEvents };

// const filesmap = JSON.parse(fs.readFileSync('uidsCorrect.json'));
// for (i in filesmap) {
//   const uid = filesmap[i];
//   setTimeout(() => deleteEvent(uid), i * 250);
// }
