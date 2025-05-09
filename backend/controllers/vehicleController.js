const { VehicleType, Vehicle } = require('../models');

exports.getVehicleTypes = async (req, res) => {
    console.log("datacheked");
    
  const { wheels } = req.query; // ?wheels=2 or ?wheels=4
  try {
    const types = await VehicleType.findAll({ where: { wheels } });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
};

exports.getVehiclesByType = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { vehicleTypeId: req.params.typeId } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};
