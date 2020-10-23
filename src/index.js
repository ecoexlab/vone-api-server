require('dotenv').config();

const Koa = require('koa');
const cors = require('koa-cors');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const api = require('./api');
const bodyParser = require('koa-bodyparser');

app.use(cors());
app.use(bodyParser());



const port = process.env.PORT || 3001;

router.use('/api', api.routes());




app.use(router.routes()).use(router.allowedMethods());

app.listen(3001, () => {
    console.log('✅ Server is listening to port 3001.');
});