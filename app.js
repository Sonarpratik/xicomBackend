//app.js
const express = require('express');
const connectDB = require('./src/config/db');
const server = require('./src/config/server'); // Import the server setup
const constants = require('./src/config/constants'); // Import the server setup

require('dotenv').config();

// Connect to the database
const path = require('path');
const app = express();

app.use(express.json());
app.use('/documents', express.static(path.join(__dirname, 'documents')));

app.use(server)
app.use(constants)


          connectDB();
// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
