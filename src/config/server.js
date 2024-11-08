const express = require("express");
const authGuard = require("../middlewares/authMiddleware");
const userRoutes = require("../modules/user/userRoutes");
const setupCors = require("./corsSetup");
const path = require('path');
const app = express();

app.use(setupCors());
app.use(express.json());


app.use((req, res, next) => {
  const publicRoutes = ["/auth/login"];

  // Check for exact matches first
  if (publicRoutes.includes(req.path)) {
    return true;
  }

  // Check for routes with dynamic parameters (e.g., /api/product/:id)

 

  authGuard(req, res, next);
});

app.use("/api/user", userRoutes);

module.exports = app;
