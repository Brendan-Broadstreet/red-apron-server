require('dotenv').config();
var express = require('express');
var app = express();
var sequelize = require('./db');
var bodyParser = require("body-parser");

var user = require('./controllers/usercontroller');
// var menu = require('./controllers/menucontroller');
// var cart = require('./controllers/cartcontroller');
// var checkout = require('./controllers/checkoutcontroller');

sequelize.sync();
app.use(bodyParser.json());

app.use(require("./middleware/header"));

app.use('/api/user', user);

app.use(require("./middleware/validate-session"));
// protected routes follow requiring session token

// app.use('/api/menu', menu);

app.listen(process.env.PORT, function () {
    console.log(`App is listening on port ${process.env.PORT}`);
});
