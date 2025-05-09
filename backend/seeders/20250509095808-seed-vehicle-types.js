'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();
    await queryInterface.bulkInsert('VehicleTypes', [
      { name: 'Hatchback', wheels: 4, createdAt: timestamp, updatedAt: timestamp },
      { name: 'Sedan', wheels: 4, createdAt: timestamp, updatedAt: timestamp },
      { name: 'SUV', wheels: 4, createdAt: timestamp, updatedAt: timestamp },
      { name: 'Cruiser', wheels: 2, createdAt: timestamp, updatedAt: timestamp }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};

