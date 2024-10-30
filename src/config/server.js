const express = require('express');
const authGuard = require('../middlewares/authMiddleware');
const userRoutes = require('../auth-modules/user/userRoutes');
const authRoutes = require('../auth-modules/auth/authRoutes');
const userRoleRoutes = require('../auth-modules/user-role/userRoleRoutes');
const productRoutes = require('../modules/product/productRoutes');
const cartRoutes = require('../modules/cart/cartRoutes');
const categoryRoutes = require('../modules/category/categoryRoutes');
const setupCors = require('./corsSetup');

const app = express();

app.use(setupCors());
app.use(express.json());

app.use((req, res, next) => {
  const publicRoutes = ['/auth/login','/auth/google/login', '/api/users/register','/api/product',];

  if (publicRoutes.includes(req.path)) {
  // if (true) {
    return next(); 
  }

  authGuard(req, res, next);
});

app.use('/api/users', userRoutes);  
app.use('', authRoutes);   
app.use('/api/user-role', userRoleRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/category', categoryRoutes);

module.exports = app;
