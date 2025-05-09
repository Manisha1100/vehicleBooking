'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [types] = await queryInterface.sequelize.query(`SELECT id, name FROM VehicleTypes`);
    const timestamp = new Date();
    const vehicles = [];

    types.forEach(type => {
      vehicles.push({
        name: `${type.name} A`,
        vehicleTypeId: type.id,
        createdAt: timestamp,
        updatedAt: timestamp
      });
      vehicles.push({
        name: `${type.name} B`,
        vehicleTypeId: type.id,
        createdAt: timestamp,
        updatedAt: timestamp
      });
    });

    await queryInterface.bulkInsert('Vehicles', vehicles);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};


