import { SHEET_ID, baseReadingGoogleSheetUri, API_KEY } from './config';
import { google, sheets_v4 } from 'googleapis';

const URI = `${baseReadingGoogleSheetUri(SHEET_ID)}:batchUpdate?key=${API_KEY}`;

const request: sheets_v4.Schema$BatchUpdateSpreadsheetRequest = {
  requests: [{
    repeatCell: {
      range: {
        startColumnIndex: 0,
        endColumnIndex: 1,
        endRowIndex: 1,
        sheetId: 0
      },

      cell: {
        userEnteredValue: {
          numberValue: 777,
        }
      },

      fields: '*',
    }
  }]
};

const testWriting = () => {
  fetch(URI, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      //update this token with yours. 
      Authorization: `${API_KEY}`,
    },
    body: JSON.stringify(request)
  })
    .then(res => res)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export default testWriting;