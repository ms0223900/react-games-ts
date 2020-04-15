import { Callback } from 'common-types';
import { google } from 'googleapis'
import credentials from '../credentials.json'
import token from './token.json'
import { SHEET_ID } from './config'

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const authorizeAndReadSheet = () => {
  authorize(credentials, listMajors);
}

function authorize(credentials: any, callback: Callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]
  );
  
  oAuth2Client.setCredentials(token);
  callback(oAuth2Client);
}

function listMajors(auth: any) {
  const sheets = google.sheets({version: 'v4', auth });
  sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    if(res) {
      const rows = res.data.values;
      if (rows && rows.length) {
        console.log('Name, Major:');
        // Print columns A and E, which correspond to indices 0 and 4.
        rows.map((row) => {
          console.log(`${row[0]}, ${row[4]}`);
        });
      } else {
        console.log('No data found.');
      }
    }
  });
}

export default authorizeAndReadSheet