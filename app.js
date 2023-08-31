const express = require('express');
const bodyParser = require('body-parser');
// Set up mongoose connection
const mongoose = require('mongoose');

const app2 = express();
const app = express();

const fs = require('fs');

const options = {
   key: fs.readFileSync('/etc/letsencrypt/live/app-vfcs.greenholespace.co.id-0001/privkey.pem'),
   cert: fs.readFileSync('/etc/letsencrypt/live/app-vfcs.greenholespace.co.id-0001/cert.pem'),
   ca: fs.readFileSync('/etc/letsencrypt/live/app-vfcs.greenholespace.co.id-0001/chain.pem'),
};

const server = require('https').createServer(options, app);
const socket = require('socket.io');
const server2 = require('https').createServer(options, app2);
const path = require('path');
const receivingMaterial = require('./routes/receiving_material.route');
const attachments = require('./routes/attachments.route');
const productionOrder = require('./routes/production_order.route');
const balesPressing = require('./routes/bales_pressing.route');
const deliveryOrder = require('./routes/delivery_order.route');
const generateNumber = require('./routes/generate_number.route');
const masterGoodsCart = require('./routes/master_goods_cart.route');
const users = require('./routes/users.route');
const auth = require('./routes/auth.route');
const department = require('./routes/department.route');
const job = require('./routes/job.route');
const jobLevel = require('./routes/job_level.route');
const roleUser = require('./routes/role_user.route');
const uom = require('./routes/uom.route');
const materialGoods = require('./routes/material_goods.route');
const feedStocktype = require('./routes/feedstock_type.route');
const purchaseOrder = require('./routes/purchase_order.route');
const salesOrder = require('./routes/sales_order.route');
const transactionCart = require('./routes/transaction_cart.route');
const indonesia = require('./routes/indonesia.route');
const dashboard = require('./routes/dashboard.route');
const productionOrderCart = require('./routes/production_order_cart.route');
const transaction = require('./routes/transaction.route');
const kpi = require('./routes/kpi.route');
const tracking = require('./routes/tracking.route');
const strings = require('./utils/strings');

// Mongo Configuration
// mongoose.connect('mongodb://198.167.141.251:27017/db_vfcs', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb://katmongo:katmongo123@103.152.119.112:27017/db_vfcs_dummy?authSource=db_vfcs_dummy&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://katmongo:katmongo123@103.160.62.176:27017/db_vfcs_dummy?authSource=db_vfcs_dummy&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {
  console.log('Successfully connected to MongoDB!');
});

// Calling Route
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//--------------------
// CODING API POSGRESQL
//--------------------
app.use('/img', express.static(path.join(__dirname, 'public/uploads')));

// App Listener
app.use(`/${strings.route.receiving_material}`, receivingMaterial);
app.use(`/${strings.route.attachments}`, attachments);
app.use(`/${strings.route.production_order}`, productionOrder);
app.use(`/${strings.route.bales_pressing}`, balesPressing);
app.use(`/${strings.route.delivery_order}`, deliveryOrder);
app.use(`/${strings.route.generate_number}`, generateNumber);
app.use(`/${strings.route.master_goods_cart}`, masterGoodsCart);
app.use(`/${strings.route.users}`, users);
app.use(`/${strings.route.auth}`, auth);
app.use(`/${strings.route.department}`, department);
app.use(`/${strings.route.job}`, job);
app.use(`/${strings.route.job_level}`, jobLevel);
app.use(`/${strings.route.role_user}`, roleUser);
app.use(`/${strings.route.uom}`, uom);
app.use(`/${strings.route.material_goods}`, materialGoods);
app.use(`/${strings.route.feedstock_type}`, feedStocktype);
app.use(`/${strings.route.purchase_order}`, purchaseOrder);
app.use(`/${strings.route.sales_order}`, salesOrder);
app.use(`/${strings.route.transaction_cart}`, transactionCart);
app.use(`/${strings.route.indonesia}`, indonesia);
app.use(`/${strings.route.dashboard}`, dashboard);
app.use(`/${strings.route.kpi}`, kpi);
app.use(`/${strings.route.production_order_cart}`, productionOrderCart);
app.use(`/${strings.route.transaction}`, transaction);
app.use(`/${strings.route.tracking}`, tracking);
const port = 911;
server.listen(port, () => {
  console.log(`Server Mongo is up and running on port number ${port}`);
});

// Socket setup
const io = socket(server);

io.on('connection', (socket) => {
  console.log('Made socket connection');
});

app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: false }));
require('./app_postgresql/router/router.js')(app2);

const port2 = 1234;
server2.listen(port2, () => {
  console.log(`Server is up and running on port number ${port2}`);
});
