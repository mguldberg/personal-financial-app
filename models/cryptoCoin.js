module.exports = function (sequelize, DataTypes) {
    console.log("Investment start")
    var ListCryptoCoin = sequelize.define("ListCryptoCoin", {
        coinName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coinSymbol:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        ImageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

return ListCryptoCoin;
};


