const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173'|| 'http://localhost:3000'||'http://localhost:5173', 
  // origin: process.env.FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true, 
  optionsSuccessStatus: 200, 
};
console.log(corsOptions);
const setupCors = () => cors(corsOptions);

module.exports = setupCors;
