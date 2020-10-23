const Router = require('koa-router');

const api = new Router();
const orders = require('./orders');

api.use('/orders', orders.routes());

module.exports = api;