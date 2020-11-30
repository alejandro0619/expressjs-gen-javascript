// ! importing modules:
const express = require('express');
const config = require('./server/config');
const app = config(express());
// require('dotenv').config();
 require('./config/database_config');

// start:
app.listen(app.get('port'), () => {
  console.log('Server is running on', app.get('port'))
});