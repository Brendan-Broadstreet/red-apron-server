module.exports = function (sequelize, DataTypes) {
    return sequelize.define('favlist', {
        productId: DataTypes.INTEGER,
        owner: DataTypes.INTEGER
    })
}