const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers['authorization'];

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        // Verify the token
        const verified = jwt.verify(token.split(" ")[1], process.env.ACCESS_TOKEN_SECRET);
        
        req.user = verified; // Attach the decoded token data to the request object
        next(); // Move to the next middleware or route handler
    } catch (error) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};

module.exports = authGuard;
