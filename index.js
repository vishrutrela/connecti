const favicon = require('serve-favicon');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4001;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const flash = require('connect-flash');
const customWare= require('./config/middleware');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('assets'));
// make upload path available fo browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts);





// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
   
    name: 'ConnectEye',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
     

    },
    

    
}));
console.log('session acquired');
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customWare.setFlash);
// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
