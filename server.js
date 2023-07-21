const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
require('dotenv').config()

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static('public'));

// Session
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// cookie parser middleware
app.use(cookieParser());

// EJS
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(routes);
app.listen(process.env.APP_PORT, () => console.log(`Acesse: http://localhost:${process.env.APP_PORT}/`));