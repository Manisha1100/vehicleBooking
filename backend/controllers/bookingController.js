const { Booking } = require('../models');
const { Op } = require('sequelize');

exports.createBooking = async (req, res) => {
  const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

  try {
    const overlappingBooking = await Booking.findOne({
      where: {
        vehicleId,
        [Op.or]: [
          {
            startDate: { [Op.between]: [startDate, endDate] },
          },
          {
            endDate: { [Op.between]: [startDate, endDate] },
          },
          {
            startDate: { [Op.lte]: startDate },
            endDate: { [Op.gte]: endDate },
          }
        ]
      }
    });

    if (overlappingBooking) {
      return res.status(400).json({ error: 'Vehicle already booked for the selected dates' });
    }

    const booking = await Booking.create({ firstName, lastName, vehicleId, startDate, endDate });
    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};
