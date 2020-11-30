// ! Importing modules:
const express = require('express')
const route = express.Router();

// you can add every method that you require:
const { home } = require('../controllers/main')

//routes go below:
route.get('/', home);

// export:
module.exports = route;