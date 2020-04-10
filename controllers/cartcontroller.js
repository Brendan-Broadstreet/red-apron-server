let express = require('express')
let router = express.Router()
let sequelize = require('../db')
let CartModel = sequelize.import('../models/cart')

//Get All Recipies by User ID
router.get('/', function (req, res) {
    let userid = req.user.id
    CartModel.findAll({
        where: { owner: userid }
    }).then(
        function findAllSuccess(data) {
            res.json(data)
        },
        function findAllError(err) {
            res.send(500, err.message)
        }
    )
})

//Post to Cart
router.post('/', function (req, res) {
    let owner = req.user.id
    let productId = req.body.cart.productId
    let productName = req.body.cart.productName
    let qty = req.body.cart.qty
    let price = req.body.cart.price

    CartModel.create({
        productName: productName,
        productId: productId,
        qty: qty,
        price: price,
        owner: owner
    }).then(
        function createSuccess(response) {
            res.json({ message: 'success', added: response });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    )
})

//Update Combo Menu Item
router.put('/update/:id', function (req, res) {
    let userid = req.user.id
    let productId = req.body.cart.productId
    let productName = req.body.cart.productName
    let qty = req.body.cart.qty
    let price = req.body.cart.price
    let primaryKey = req.params.id
    console.log(req.user.id)
    CartModel.update(
        {
            productName: productName,
            productId: productId,
            qty: qty,
            price: price,
            owner: userid
        },
        { where: { id: primaryKey, owner: userid } }
    ).then(data => {
        return data > 0
            ? res.send('Update Successful!')
            : res.send('Error, no updates where made.');
    }),
        err => res.send(500, err.message);
})

//Delete Cart Item
router.delete('/delete/:id', function (req, res) {
    let primaryKey = req.params.id;
    let userid = req.user.id;
    CartModel.destroy({
        where: { id: primaryKey, owner: userid }
    }).then(data => {
        return data > 0
            ? res.send('Menu item removed')
            : res.send('Error, nothing removed');
    }),
        err => res.send(500, err.message);
});

module.exports = router