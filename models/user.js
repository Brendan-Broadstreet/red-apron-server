module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        passwordhash: DataTypes.STRING,
        challengequestion: DataTypes.STRING,
        admin: DataTypes.BOOLEAN
    });
};
