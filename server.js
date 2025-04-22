const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// To create a session middleware with the given options
const session = require("express-session");
let flash = require('flash')
let port = 5000;


let configDB = require("./config/database.js");
let db;

// Middleware
app.set("view engine",'ejs')
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"))

MongoClient.connect(configDB.url)
    .then(client => {
        db = client.db(configDB.dbName);
        console.log('Connected to database');
        require('./app/routes.js')(app, passport, db)
        app.listen(port, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch(err => console.error(err));


require('./config/passport.js')(passport)

// require for passport

app.use(session({
    secret: "roommate",
    resave:true,
    saveUninitialized:true
}))

app.use(passport.initialize()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session

