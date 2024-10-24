const express = require('express');
const authGuard = require('../middlewares/authMiddleware');
const userRoutes = require('../auth-modules/user/userRoutes');
const authRoutes = require('../auth-modules/auth/authRoutes');
const userRoleRoutes = require('../auth-modules/user-role/userRoleRoutes');
const setupCors = require('./corsSetup');

const app = express();

app.use(setupCors());
app.use(express.json());

app.use((req, res, next) => {
  const publicRoutes = ['/auth/login', '/auth/verify', '/api/users/register'];

  if (publicRoutes.includes(req.path)) {
    return next(); 
  }

  authGuard(req, res, next);
});

app.use('/api/users', userRoutes);  
app.use('', authRoutes);   
app.use('/api/user-role', userRoleRoutes);

module.exports = app;
