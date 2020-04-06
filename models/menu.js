module.exports = function (sequelize, DataTypes) {
    return sequelize.define('menu', {
        name: DataTypes.STRING,
        img: DataTypes.STRING(10000),
        category: DataTypes.STRING,
        ingredients: DataTypes.STRING(100000),
        instructions: DataTypes.STRING(100000),
        cooktime: DataTypes.INTEGER,
        preptime: DataTypes.INTEGER,
        servings: DataTypes.INTEGER,
        price: DataTypes.STRING,
        // owner: DataTypes.INTEGER
    })
}