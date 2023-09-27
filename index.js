const express = require('express');
const passport = require('passport');
const session = require('express-session');
const fs = require('fs')
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
const multer = require('multer');

const port = 6400;

const app = express();

app.set('view engine', 'ejs')

const localpassport = require('./model/localpassport')

const db = require('./config/mongoose')

app.use(
    session({
        name: 'drb',
        secret: 'drb',
        saveUninitialized: true,
        resave: true,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })
)

app.use(express.urlencoded());
app.use(cookieParser())
app.use(flash())
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(passport.session());
app.use(passport.initialize());
app.use(passport.setAuthentication); 

app.use((req, res, next) => {
    res.locals.message = req.flash();
    next();
});


app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log("server is start on port : " + port);
})