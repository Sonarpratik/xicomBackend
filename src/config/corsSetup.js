const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  // origin: process.env.FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true, 
  optionsSuccessStatus: 200, 
};

const setupCors = () => cors(corsOptions);

module.exports = setupCors;
