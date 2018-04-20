module.exports = function (sequelize, DataTypes) {
  var Expense = sequelize.define("Expense", {
    amount: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true

      }
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: {
          args: [2, 20],
          msg: "Your item name is not long enough or too long.  It must be between 2 and 20 characters."
        }

      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: {
          args: [2, 20],
          msg: "Your  category name is not long enough or too long.  It must be between 2 and 20 characters."
        }
      },
    },
    datePaid: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDate: true

      }
    }

  });


  Expense.associate = function (models) {
    Expense.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Expense;
};
