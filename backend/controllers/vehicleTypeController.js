const { VehicleType } = require('../models');

exports.getVehicleTypesByWheels = async (req, res) => {
    const { wheels } = req.query;
    try {
      const types = await VehicleType.findAll({
        where: { wheels: Number(wheels) },
      });
      res.json(types);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching vehicle types' });
    }
  };
  
