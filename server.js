if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 1337;
const path = require("path");

var passport = require('passport');
var flash = require('connect-flash');
const { urlencoded } = require('body-parser');

// easy for complicated stuff
// to use the passport into the function in src
require('./src/myvaccin')(passport);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));

// to use the ejs files
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// easy for complicated stuff
// to use the passport into the function in route
require('./route/myvaccin.js')(app, passport);

app.listen(port);
console.log("Port: " + port);