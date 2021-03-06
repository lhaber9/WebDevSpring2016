var express = require('express');
var uuid = require('node-uuid');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser  = require('cookie-parser');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var connectionString = 'mongodb://127.0.0.1:27017/formMakerDB';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({
    secret: 'test',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

require("./public/assignment/server/app.js")(app, uuid, mongoose, passport, LocalStrategy);
require("./public/project/server/app.js")(app, uuid, mongoose, passport);
app.listen(port, ipaddress);
