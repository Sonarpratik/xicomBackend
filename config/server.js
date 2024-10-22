const express = require('express');
const authGuard = require('../middlewares/authMiddleware');
const userRoutes = require('../modules/user/userRoutes');
const authRoutes = require('../modules/auth/authRoutes');
const userRoleRoutes = require('../modules/user-role/userRoleRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const publicRoutes = ['/login', '/api/users/register'];

  if (publicRoutes.includes(req.path)) {
    return next(); 
  }

  authGuard(req, res, next);
});

app.use('/api/users', userRoutes);  
app.use('', authRoutes);   
app.use('/api/user-role', userRoleRoutes);

module.exports = app;
