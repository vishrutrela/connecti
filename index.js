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
// const MongoStore = require('connect-mongo')(session);
// const mongoStoreInstance = new MongoStore({
//     /* Configuration options */
//     mongooseConnection: mongoose.connection,
//     autoRemove: 'disabled'
//   }); 
//   const sassMiddleware = require('node-sass-middleware')//not installed yet/************/
const flash = require('connect-flash');
const customWare= require('./config/middleware');
//   app.use(sassMiddleware({
//     src: '/assets/scss',
//     dest: '/assets/css',
//     debug: true,
//     outputStyle:'extended',
//     prefix: '/css'
//   }))
// const sassmiddleware=  require('node-sass')**********************************************************
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('assets'));
// make upload path available fo browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);




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
    // store:  mongoStoreInstance   

    },
    

    // store: new MongoStore(
        
    //     function(err){
    //         console.log(err ||  'connect-mongodb setup ok');
    //     }
    // )
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
