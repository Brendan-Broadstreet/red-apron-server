let express = require('express')
let router = express.Router()
let sequelize = require('../db')
let FavlistModel = sequelize.import('../models/favlist')

//Get All Favorites by User ID
router.get('/', function (req, res) {
    let userid = req.user.id
    FavlistModel.findAll({
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
    let productId = req.body.cart.productId
    FavlistModel.create({
        productId: productId,
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
//Delete Item from Favlist
router.delete('/:id', function (req, res) {
    let primaryKey = req.params.id;
    let userid = req.user.id;
    FavlistModel.destroy({
        where: { id: primaryKey, owner: userid }
    }).then(data => {
        return data > 0
            ? res.send({message: 'Favlist item removed'})
            : res.send({message: 'Error, nothing removed'});
    }),
        err => res.send(500, err.message);
});
module.exports = router