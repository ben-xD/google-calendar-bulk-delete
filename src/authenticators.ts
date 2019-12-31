import { readFileSync, writeFileSync } from 'fs';
import * as readline from 'readline';
import { google } from 'googleapis';

export default class GoogleAuthenticator {
  scopes: string[];
  tokenPath: string;
  credentialPath: string;
  
  constructor(
    scopes = ['https://www.googleapis.com/auth/calendar'],
    tokenPath = 'token.json',
    credentialPath = 'credentials.json',
  ) {
    this.scopes = scopes;
    this.tokenPath = tokenPath;
    this.credentialPath = credentialPath;
  }

  async getCalendar() {
    const credentials = this.getCredentialsFromFile();
    const auth = GoogleAuthenticator.createOAuth2Client(credentials);
    const token = await this.getToken(auth);
    auth.setCredentials(token);
    return google.calendar({ version: 'v3', auth });
  }

  async getToken(oAuth2Client) {
    let token;
    try {
      token = JSON.parse(readFileSync(this.tokenPath).toString());
    } catch (err) {
      const response = await this.getAccessToken(oAuth2Client);
      token = response.tokens;
      writeFileSync(this.tokenPath, JSON.stringify(token));
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
      return JSON.parse(readFileSync(this.credentialPath).toString());
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
    const code = await readlineQuestion('Enter the code from that page here: ');
    const token = oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(token);
    return token;
  }
}

const readlineQuestion = (q: string): Promise<string> => {
    return new Promise((res, rej) => {
      const rl = readline.createInterface({input: process.stdin, output: process.stdout});
      rl.question(q, (text) => {
        res(text)
      })
    })
} 