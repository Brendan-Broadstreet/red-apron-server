var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// create a new user
router.post('/signup', function (req, res) {

    var firstName = req.body.user.firstname;
    var lastName = req.body.user.lastname;
    var username = req.body.user.username;
    var email = req.body.user.email;
    var password = req.body.user.password;
    var passwordhash = password;
    var challengequestion = req.body.user.challengequestion;
    var admin = req.body.user.admin;

    User.create({
            firstname: firstName,
            lastname: lastName,
            username: username,
            email: email,
            passwordhash: bcrypt.hashSync(password, 10),
            challengequestion: challengequestion,
            admin: admin
        })
        .then(

            function createSuccess(user) {
                var token = jwt.sign({
                    id: user.id
                }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24
                });
                res.json({
                    user: user,
                    message: 'user created',
                    sessionToken: token
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

// login existing user
router.post("/login", function (req, res) {
    var email = req.body.user.email;
    var password = req.body.user.password;

    User.findOne({
            where: { email: email }
        })
        .then(user => {
            user ? comparePasswords(user) : res.send("User not found in our database ");

            function comparePasswords(user) {
                bcrypt.compare(password, user.passwordhash, function (err, matches) {
                    matches ? generateToken(user) : res.send("Incorrect Password");
                });
            }

            function generateToken(user) {

                var token = jwt.sign({
                    id: user.id
                }, process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 24
                });

                res.json({
                    user: user,
                    message: 'session token created',
                    sessionToken: token
                });
            }
        });
});

module.exports = router;
