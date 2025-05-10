const { VehicleType, Vehicle } = require('../models');

exports.getVehicleTypes = async (req, res) => {
    console.log("datacheked");
    
  const { wheels } = req.query; 
  try {
    const types = await VehicleType.findAll({ where: { wheels } });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
};

exports.getVehiclesByType = async (req, res) => {
  const { typeId } = req.query;
  console.log("Received typeId:", typeId);

  if (!typeId) {
    return res.status(400).json({ error: 'typeId is required' });
  }

  try {
    const vehicles = await Vehicle.findAll({ where: { vehicleTypeId: typeId } });
    if (vehicles.length === 0) {
      return res.status(404).json({ error: 'No vehicles found for the specified type' });
    }
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};




