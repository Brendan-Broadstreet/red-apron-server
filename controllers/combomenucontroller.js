let express = require('express')
let router = express.Router()
let sequelize = require('../db')
let ComboMenuModel = sequelize.import('../models/combomenu')

//Get All Recipies by User ID
router.get('/myrecipes', function (req, res) {
    let primaryKey = req.params.id
    let userid = req.user.id
    ComboMenuModel.findAll({
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
    let owner = req.user.id
    let name = req.body.combomenu.name
    let img = req.body.combomenu.img
    let category = req.body.combomenu.category
    let entree = req.body.combomenu.entree
    let side = req.body.combomenu.side
    let ingredients = req.body.combomenu.ingredients
    let instructions = req.body.combomenu.instructions
    let cooktime = req.body.combomenu.cooktime
    let preptime = req.body.combomenu.preptime
    let servings = req.body.combomenu.servings
    let price = req.body.combomenu.price

    ComboMenuModel.create({
        name: name,
        img: img,
        category: category,
        entree: entree,
        side: side,
        ingredients: ingredients,
        instructions: instructions,
        cooktime: cooktime,
        preptime: preptime,
        servings: servings,
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
    let primaryKey = req.params.id
    let name = req.body.combomenu.name
    let img = req.body.combomenu.img
    let category = req.body.combomenu.category
    let entree = req.body.combomenu.entree
    let side = req.body.combomenu.side
    let ingredients = req.body.combomenu.ingredients
    let instructions = req.body.combomenu.instructions
    let cooktime = req.body.combomenu.cooktime
    let preptime = req.body.combomenu.preptime
    let servings = req.body.combomenu.servings
    let price = req.body.combomenu.price
    let owner = req.user.id

    ComboMenuModel.update(
        {
            name: name,
            img: img,
            category: category,
            entree: entree,
            side: side,
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

//Delete Combo Menu
router.delete('/delete/:id', function (req, res) {
    let primaryKey = req.params.id;
    let userid = req.user.id;
    ComboMenuModel.destroy({
        where: { id: primaryKey, owner: userid }
    }).then(data => {
        return data > 0
            ? res.send('Menu item removed')
            : res.send('Error, nothing removed');
    }),
        err => res.send(500, err.message);
});

module.exports = router