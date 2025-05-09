'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VehicleType extends Model {
    static associate(models) {
      // A VehicleType has many Vehicles
      VehicleType.hasMany(models.Vehicle, { foreignKey: 'vehicleTypeId' });
    }
  }
  VehicleType.init({
    name: DataTypes.STRING,
    wheels: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'VehicleType',
  });
  return VehicleType;
};
