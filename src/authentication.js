import { readFileSync, writeFileSync } from 'fs';
import readlineSync from 'readline-sync';
import { google } from 'googleapis';

export default class GoogleAuthentication {
  constructor(
    scopes = ['https://www.googleapis.com/auth/calendar'],
    tokenPath = 'token.json',
    credentialPath = 'credentials.json',
  ) {
    this.scopes = scopes;
    this.tokenPath = tokenPath;
    this.credentialPath = credentialPath;
  }

  async authorize() {
    const credentials = this.getCredentialsFromFile();
    const authClient = GoogleAuthentication.createOAuth2Client(JSON.parse(credentials));
    const token = await this.getToken(authClient);
    authClient.setCredentials(token);
    return authClient;
  }

  async getToken(oAuth2Client) {
    // Check if we have previously stored a token.
    let token;
    try {
      token = JSON.parse(readFileSync(this.tokenPath));
    } catch (err) {
      token = await this.getAccessToken(oAuth2Client);
      writeFileSync(this.tokenPath, JSON.stringify(token.tokens));
      console.log('Token stored to', this.tokenPath);
    }
    return token;
  }

  static createOAuth2Client(credentials) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const authClient = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0],
    );
    return authClient;
  }

  getCredentialsFromFile() {
    try {
      return readFileSync(this.credentialPath);
    } catch (err) {
      // throw err;
      throw 'Ensure your credentials.json file is present.';
    }
  }

  async getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const code = readlineSync.question('Enter the code from that page here: ');
    const token = oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(token);
    return token;
  }
}
