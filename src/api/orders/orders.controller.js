const {google} = require('googleapis');
const aligoapi = require('aligoapi');
const client = require('common/google');


exports.create = async (ctx) => {

    const orderData = ctx.request.body;

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
           
        }).catch(e => {
            return ctx.throw(500, e);
        });

        let AuthData = {
            key: process.env.ALIGO_API_KEY,
            user_id: process.env.ALIGO_USER_ID,
        }

        ctx.request.body = {
            sender: '01089440317',
            receiver: '01026986610',
            msg: '배차 주문 의뢰가 있습니다. 확인 부탁드립니다.',
            msg_type: 'SMS',
            title: '배차 알림',
            destination: '관리자',
        };

        aligoapi.send(ctx.request, AuthData)
        .then((r) => {
            console.log(r);
        })
        .catch((e)=> {
            return ctx.throw(500, e);
        });

        
    }).catch( e => {
        ctx.throw(500,e);
    });

    ctx.body={
        message:"good"
    };

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