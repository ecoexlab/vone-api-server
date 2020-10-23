const aligoapi = require('aligoapi');
const axios = require('axios');

exports.sendSMS = (req, res) => {

    console.log('Send SMS');
    
    let AuthData = {
        key: process.env.ALIGO_API_KEY,
        user_id: process.env.ALIGO_USER_ID,
    }


    req.body = {
        sender: '01089440317',
        receiver: '01089440317',
        msg: 'TEST MSG',
        msg_type: 'SMS',
        title: 'TEST TITLE',
        destination: '서상원',
    };

    AuthData.testmode_yn = 'Y';


    aligoapi.send(req, AuthData)
    .then((r) => {
        console.log(r);
        res.send(r)
    })
    .catch((e)=> {
        console.log(e);
        res.send(e)
    });
}
