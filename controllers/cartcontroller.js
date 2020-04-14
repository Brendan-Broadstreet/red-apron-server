let express = require('express')
let router = express.Router()
let sequelize = require('../db')
let CartModel = sequelize.import('../models/cart')

//Get All Favorites by User ID
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

router.post('/', function (req, res) {
    let owner = req.user.id
    let productId = req.body.productId
    let productName = req.body.productName
    let price = req.body.price
    let qty = req.body.qty
    CartModel.create({
        productId: productId,
        owner: owner,
        productName: productName,
        price: price,
        qty: qty
    }).then(
        function createSuccess(response) {
            res.json({ message: 'success', added: response });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    )
})
//Delete Item from Cart
router.delete('/:id', function (req, res) {
    let primaryKey = req.params.id;
    let userid = req.user.id;
    CartModel.destroy({
        where: { id: primaryKey, owner: userid }
    }).then(data => {
        return data > 0
            ? res.send({ message: 'Cart item removed' })
            : res.send({ message: 'Error, nothing removed' });
    }),
        err => res.send(500, err.message);
});

//Update Combo Menu Item
router.put('/update/:id', function (req, res) {
    let userid = req.user.id
    let qty = req.body.cart.qty
    let primaryKey = req.params.id
    console.log(req.user.id)
    CartModel.update(
        {
            qty: qty,
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

module.exports = router