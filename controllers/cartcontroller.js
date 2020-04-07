let express = require('express')
let router = express.Router()
let sequelize = require('../db')
let CartModel = sequelize.import('../models/cart')

router.get('/cart', function (req, res) {
    // let primaryKey = req.params.id
    // let userid = req.user.id
    CartModel.findAll({
        // where: { id: primaryKey, owner: userid }
    }).then(
        function findAllSuccess(data) {
            res.json(data)
        },
        function findAllError(err) {
            res.send(500, err.message)
        }
    )
})

module.exports = router