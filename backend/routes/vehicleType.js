const express = require('express');
const router = express.Router();
const vehicleTypeController = require('../controllers/vehicleTypeController');

router.get('/vehicle-types', vehicleTypeController.getVehicleTypesByWheels);

module.exports = router;
