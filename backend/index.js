const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

const db = require('./models');
app.use(express.json());

// Routes
const vehicleRoutes = require('./routes/vehicles');
const bookingRoutes = require('./routes/bookings');
app.use('/api', vehicleRoutes);
app.use('/api', bookingRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
