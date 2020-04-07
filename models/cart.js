module.exports = function (sequelize, DataTypes) {
    return sequelize.define('cart', {
        productId: DataTypes.INTEGER,
        productName: DataTypes.STRING,
        qty: DataTypes.INTEGER,
        price: DataTypes.STRING,
        // owner: DataTypes.INTEGER
    })
}