const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const util = require('util');
const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  async function (email, password, done) {
    try {
      const user = await User.findOne({ email: email });
      if (!user || user.password !== password) {
        console.log('Invalid Username/Password');
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user --> Passport');
      return done(err);
    }
  }
));

// Serializing the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
 
// Deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(function(user) {
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(function(err) {
      console.log('Error in finding user:', err);
      return done(err, false);
    });
});
//check if the user is authenticated

passport.checkAuthentication= function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated){
    res.locals.user = req.user;
  }
  next();
}

module.exports = passport;

