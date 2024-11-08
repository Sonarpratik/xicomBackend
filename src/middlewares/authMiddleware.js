
const authGuard = (req, res, next) => {
    // Get the token from the request header
  next()
};

module.exports = authGuard;
