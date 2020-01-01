import { readFileSync, writeFileSync } from 'fs';
import * as readline from 'readline';
import { google } from 'googleapis';


interface Options {
  scopes?: string[],
  tokenPath: string,
  credentialPath: string,
}

export default class GoogleAuthenticator {
  scopes: string[];
  tokenPath: string;
  credentialPath: string;
  

  static defaultOptions = {
    scopes: ['https://www.googleapis.com/auth/calendar'],
 }
  
  constructor(options: Options) {
    options = {...GoogleAuthenticator.defaultOptions, ...options};
    this.scopes = options.scopes;
    this.tokenPath = options.tokenPath;
    this.credentialPath = options.credentialPath;
  }

  async getUser() {
    let credentials;
    try {
      credentials = JSON.parse(readFileSync(this.credentialPath).toString());
    } catch (err) {
      throw 'Ensure your credentials.json file is present.';
    }
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