const express = require('express');
const userRoutes = require('../modules/user/userRoutes');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/users', userRoutes);

// Export the app instance
module.exports = app;
