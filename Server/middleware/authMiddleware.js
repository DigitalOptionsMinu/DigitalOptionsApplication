const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Acces neautorizat. Token lipsă.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalid sau expirat. Autentificare necesară.' });
        }

        req.user = decodedToken; 
        next();
    });
};

module.exports = {
    verifyToken,
};
