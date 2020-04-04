module.exports = function (sequelize, DataTypes) {
    return sequelize.define('combomenu', {
        name: DataTypes.STRING,
        img: DataTypes.STRING,
        category: DataTypes.STRING,
        entree: DataTypes.STRING,
        side: DataTypes.STRING,
        ingredients: DataTypes.STRING(100000),
        instructions: DataTypes.STRING(100000),
        cooktime: DataTypes.INTEGER,
        preptime: DataTypes.INTEGER,
        servings: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        owner: DataTypes.INTEGER
    })
}