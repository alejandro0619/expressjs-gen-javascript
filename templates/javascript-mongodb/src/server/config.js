//! Importing modules:
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const routes = require('../routes/index')


module.exports = app =>{
    // Settings:
    app.set('port', process.env.PORT || 5000);
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');

    // Middlewares:
    app.use(morgan('dev'));   
    app.use(express.urlencoded({ extended: false}));
    app.use(express.json());


    //Routes:
    app.use(routes);

    // static files:
    app.use('/public',express.static(path.join(__dirname, '../public')));

    return app;
}