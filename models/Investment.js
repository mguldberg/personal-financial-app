module.exports = function (sequelize, DataTypes) {
    console.log("Investment start")
    var Investment = sequelize.define("Investment", {

        type: {
            type: DataTypes.STRING,
            allowNull: false,
            
            
        },
        amount: {
            type: DataTypes.DECIMAL(9, 5),
            allowNull: false,
            validate: {
                is: {
                    args: true,
                    msg: "your length of the amount must be up to 9 digits."

                }
            },
            datePurchased: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isDate: true
                }
            },
            costBasis: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false,
                validate: {
                    is: {
                        args: true,
                        msg: "your length of the costBasis must be upto 8 digits."

                    }

                }
            },
            currentValue: {
                type: DataTypes.DECIMAL(8, 2),
                allowNull: false,
                notEmpty: true,
                validate: {
                    is: {
                        args: true,
                        msg: "your length of the currentValue must be up to 8 digits."

                    }
                }
            },
        }
    });
    Investment.associate = function (models) {


        Investment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    console.log("Investment End")
    return Investment;
};


