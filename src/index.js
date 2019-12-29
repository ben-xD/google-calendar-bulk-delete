import GoogleAuthentication from './authentication';
import { listEvents, deleteEvent } from './calendarModification';

async function main() {
  const Authenticator = new GoogleAuthentication();
  const authClient = await Authenticator.authorize();
  console.log('Finished authentication');
  listEvents(authClient);
  deleteEvent('1pn9c13mdkvjfi70a9chne8838')(authClient);
}

main();

// TODO get calendar IDs
