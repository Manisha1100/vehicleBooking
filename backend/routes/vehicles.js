const express = require('express');
const router = express.Router();
const { getVehicleTypes, getVehiclesByType } = require('../controllers/vehicleController');

router.get('/vehicle-types', getVehicleTypes);
router.get('/vehicles', getVehiclesByType);

module.exports = router;
