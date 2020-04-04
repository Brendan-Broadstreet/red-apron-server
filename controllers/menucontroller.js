let express = require('express')
let router = express.Router()
let sequelize = require('../db')
let MenuModel = sequelize.import('../models/menu')

//Get All Recipies by User ID
router.get('/myrecipes', function (req, res) {
    let primaryKey = req.params.id
    let userid = req.user.id
    MenuModel.findAll({
        where: { id: primaryKey, owner: userid }
    }).then(
        function findAllSuccess(data) {
            res.json(data)
        },
        function findAllError(err) {
            res.send(500, err.message)
        }
    )
})

//View Menu
router.post('/', function (req, res) {
    let name = req.body.menu.name
    let img = req.body.menu.img
    let category = req.body.menu.category
    let ingredients = req.body.menu.ingredients
    let instructions = req.body.menu.instructions
    let cooktime = req.body.menu.cooktime
    let preptime = req.body.menu.preptime
    let servings = req.body.menu.servings
    let price = req.body.menu.price
    // let owner = req.user.id

    MenuModel.create({
        name: name,
        img: img,
        category: category,
        ingredients: ingredients,
        instructions: instructions,
        cooktime: cooktime,
        preptime: preptime,
        servings: servings,
        price: price,
        // owner: owner
    }).then(
        function createSuccess(response) {
            res.json({ message: 'success', added: response });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    )
})

//Menu Item Update
router.put('/update/:id', function (req, res) {
    let userid = req.user.id
    let primaryKey = req.params.id
    let name = req.body.menu.name
    let img = req.body.menu.img
    let category = req.body.menu.category
    let ingredients = req.body.menu.ingredients
    let instructions = req.body.menu.instructions
    let cooktime = req.body.menu.cooktime
    let preptime = req.body.menu.preptime
    let servings = req.body.menu.servings
    let price = req.body.menu.price
    let owner = req.user.id

    MenuModel.update(
        {
            name: name,
            img: img,
            category: category,
            ingredients: ingredients,
            instructions: instructions,
            cooktime: cooktime,
            preptime: preptime,
            servings: servings,
            price: price,
            owner: owner
        },
        { where: { id: primaryKey, owner: userid } }
    ).then(data => {
        return data > 0
            ? res.send('Update Successful!')
            : res.send('Error, no updates where made.');
    }),
        err => res.send(500, err.message);
})

//Delete Menu Item
router.delete('/delete/:id', function (req, res) {
    let primaryKey = req.params.id;
    let userid = req.user.id;
    MenuModel.destroy({
        where: { id: primaryKey, owner: userid }
    }).then(data => {
        return data > 0
            ? res.send('Menu item removed')
            : res.send('Error, nothing removed');
    }),
        err => res.send(500, err.message);
});

module.exports = router