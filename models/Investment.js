module.exports = function (sequelize, DataTypes) {
    console.log("Investment start")
    var Investment = sequelize.define("Investment", {
        // Giving the Author model a name of type STRING
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30],
                isAlpha: true    // will only allow letters
            }
        },
        amount: {
            type: DataTypes.DECIMAL(9,5),
            allowNull: false,
            validate: {
                is: true           // will only allow letters
            }
        },
        datePurchased: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: true,
                isDate: true           // will only allow letters
            }
        },
        costBasis: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        currentValue: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 255]
            }
        },
    });
    Investment.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Investment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    console.log("Investment End")
    return Investment;
};


