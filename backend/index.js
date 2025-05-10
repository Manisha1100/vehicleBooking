const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

require('dotenv').config();

const db = require('./models');
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Routes
const vehicleRoutes = require('./routes/vehicles');
const bookingRoutes = require('./routes/bookings');
const vehicleTypeRoutes = require('./routes/vehicleType');
app.use('/api', vehicleRoutes);
app.use('/api', bookingRoutes);
app.use('/api',vehicleTypeRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
