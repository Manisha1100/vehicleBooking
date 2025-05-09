'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // A Booking belongs to a Vehicle
      Booking.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
    }
  }
  Booking.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    vehicleId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
