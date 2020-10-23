const {google} = require('googleapis');
const client = require('../google/index');


exports.getOrder = (req, resp) => {

    const orderData = req.body;
    const order = [];
    
    const number = gsGetRows(client).then(res =>{
        const ls = [];
        const num = res+1;
        ls.push(String(num));

        for( const [key, value] of Object.entries(orderData)){
            ls.push(value);
        }
    
        order.push(ls);

        addOrder(client, num, order).then(r=>{
            resp.status(200).json({
                "message": "good"
            });
        }).catch(e => {
            resp.status(400).json({
                "message": e
            })
        });

        
    }).catch( e => {
        resp.status(400).json({
            "message": e
        })
    });


    

    
}


async function gsGetRows(cl){

    const  gsapi = google.sheets({version: 'v4', auth: cl});

    const opt = {
        spreadsheetId: '1wwxYtny-dZRXCMaBSPIZ1KMgtH_YLjxKWlccHjmkCAc',
        range: 'ORDER DATA!A2:O100'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values;

    return dataArray===undefined ? 0 : dataArray.length;
}


async function addOrder(cl, number, order){

    const  gsapi = google.sheets({version: 'v4', auth: cl});

   
    const resource = {
        values: order
    }
    const opt = {
        spreadsheetId: '1wwxYtny-dZRXCMaBSPIZ1KMgtH_YLjxKWlccHjmkCAc',
        range: `ORDER DATA!A${number+1}:O${number+1}`,
        valueInputOption: 'RAW',
        resource: resource
    };

    let data = await gsapi.spreadsheets.values.update(opt, 
        (err, result) => {
            if(err) console.log(err);
            else {
                console.log( 'Updated!');
            }
        });
}


