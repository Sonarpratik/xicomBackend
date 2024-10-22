const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./modules/user/userRoutes');

const app = express();
require('dotenv').config();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
