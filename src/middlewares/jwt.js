const jwt = require('jsonwebtoken');

const generateAccessToken = id =>
   jwt.sign(id, process.env.SECRET_KEY, { expiresIn: '3d' });

const generateRefreshToken = (id, role) =>
   jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: '30d' });

const verifyAccessToken = (req, res, next) => {};
const verifyAdmin = (req, res, next) => {};
const verifySupporter = (req, res, next) => {};

module.exports = {
   generateAccessToken,
   generateRefreshToken,
   verifyAdmin,
   verifySupporter,
   verifyAccessToken,
};
