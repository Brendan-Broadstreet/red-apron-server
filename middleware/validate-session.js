var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var Bowler = sequelize.import('../models/user.js');

module.exports = function (req, res, next) {
    if (req.method == 'OPTIONS') {
        next();
    } else {
        var sessionToken = req.headers.authorization;
        console.log(sessionToken);
        sessionToken ? verifyToken() : res.status(403).send({
            auth: false,
            message: 'No Token Provided'
        });

        function verifyToken() {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
                decoded ? findUser(decoded) : res.status(401).send({
                    error: "Not Authorized"
                });
            });
        }

        function findUser(decoded) {
            Bowler.findOne({
                where: {
                    id: decoded.id
                }
            }).then(user => {
                req.user = user;
                next();
            });
        }
    }
};
