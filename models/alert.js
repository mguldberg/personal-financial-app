
module.exports = function (sequelize, DataTypes) {
  var Alert = sequelize.define("Alert", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true

      },
      alertType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true

        },
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 50],
          notEmpty: true

        },
      }
    }
  });

  Alert.associate = function (models) {

    Alert.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Alert;
};