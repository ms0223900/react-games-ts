import { SHEET_ID, baseReadingGoogleSheetUri, API_KEY } from './config';
import { google, sheets_v4 } from 'googleapis';

const testUri = `${baseReadingGoogleSheetUri(SHEET_ID)}/values/Sheet1!A:D?key=${API_KEY}`;

const testReading = () => {
  return fetch(testUri, {
  })
    .then(res => res)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};
  

export default testReading;