require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let bodyParser = require("body-parser");

let user = require('./controllers/usercontroller');
let menu = require('./controllers/menucontroller');
let combomenu = require('./controllers/combomenucontroller');
// let cart = require('./controllers/cartcontroller');
// let checkout = require('./controllers/checkoutcontroller');

sequelize.sync();
app.use(bodyParser.json());

app.use(require("./middleware/header"));

app.use('/api/user', user);
app.use('/api/menu', menu);

app.use(require("./middleware/validate-session"));
// protected routes follow requiring session token

app.use('/api/combo', combomenu)

app.listen(process.env.PORT, function () {
    console.log(`App is listening on port ${process.env.PORT}`);
});
