const {google} = require('googleapis');

const keys = require('../../../keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null, 
    keys.private_key, 
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens){
    if(err){
        console.log(err);
        return;
    } else {
        console.log('✅ Connected to Google Sheets!');
    }
})

module.exports = client;

