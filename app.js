require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let bodyParser = require("body-parser");

let user = require('./controllers/usercontroller');
let menu = require('./controllers/menucontroller');
let cart = require('./controllers/cartcontroller');
let favlist = require('./controllers/favlistcontroller');
// let cart = require('./controllers/cartcontroller');
// let checkout = require('./controllers/checkoutcontroller');

sequelize.sync();
app.use(bodyParser.json());
app.use(require("./middleware/header"));
app.use('/api/user', user);




app.use(require("./middleware/validate-session"));
// protected routes follow requiring session token
app.use('/api/cart', cart);
app.use('/api/menu', menu);
app.use('/api/favlist', favlist);




app.listen(process.env.PORT, function () {
    console.log(`App is listening on port ${process.env.PORT}`);
});
