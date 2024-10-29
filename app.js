//app.js
const connectDB = require('./src/config/db');
const server = require('./src/config/server'); // Import the server setup

require('dotenv').config();

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
