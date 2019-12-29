import GoogleAuthenticator from './authenticators';
import { listEvents, deleteEvent } from './calendarModification';

async function main() {
  const authenticator = new GoogleAuthenticator();
  await authenticator.authorize();

  authenticator.authenticate(listEvents);
  authenticator.authenticate(deleteEvent('14hu0v3pimjrgr77c2fqiket2c'));
}

main();
