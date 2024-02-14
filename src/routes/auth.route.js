import express from 'express';

const route = express.Router();

route.get('/login', (req, res) => {
   res.send('login');
});

module.exports = route;
