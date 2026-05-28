const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'SecretFitnessKey';

module.exports = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ auth: "Failed", message: "No token provided" });
    }

    // Strip "Bearer " from string if present
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    // Verify token validity
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ auth: "Failed", message: "Invalid token" });
        } else {
            req.user = decodedToken; // Assigns { id, email, isAdmin } to req.user
            next();
        }
    });
};