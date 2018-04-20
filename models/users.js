module.exports = function (sequelize, DataTypes) {
  console.log("User start")
  var User = sequelize.define("User", {
    // Giving the Author model a name of type STRING
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
        isAlpha: true    // will only allow letters

      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        notEmpty: true,
        isAlpha: true           // will only allow letters

      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        notEmpty: true,
        isAlpha: true           // will only allow letters
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [1, 255]
        // checks for email format (foo@bar.com)

      }
    },
    cellPhone: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [10],
        isNumeric: true          // will only allow numbers
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
  console.log("User End")

  return User;
};
