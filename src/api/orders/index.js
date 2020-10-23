const Router = require('koa-router');

const orders = new Router();
const ordersCtrl = require('./orders.controller');

orders.post('/', ordersCtrl.create);

module.exports = orders;