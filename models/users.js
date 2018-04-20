module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {

    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: {
          args: [3, 20],
          msg: "Your username is not long enough or too long.  It must be between 3 and 20 characters."
        }
      }

    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: {
          args: [3, 20],
          msg: "Your first name is not long enough or too long.  It must be between 3 and 20 characters."
        }

      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlpha: true,
        len: {
          args: [3, 20],
          msg: "Your last name is not long enough or too long.  It must be between 3 and 20 characters."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 10],
          msg: "Your password length must be atleast 6 characters and no morethan 10 characters."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: {
          args: [3, 255],
          msg: "Your email is not long enough or too long. "
        }

      }
    },
    cellPhone: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        len: {
          args: [10],
          msg: "phone number must be 10 digits"
        }
      }
    },
    carrier: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [5, 25]
      }
    }
  });

  User.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    User.hasMany(models.Expense, {
      onDelete: "cascade"
    });
    User.hasMany(models.Investment, {
      onDelete: "cascade"
    });
    User.hasMany(models.Alert, {
      onDelete: "cascade"
    });
  };

  return User;
};
