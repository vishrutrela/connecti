const Post = require('../models/post');
const User = require('../models/user');

module.exports.profile = function(req, res){
  return res.render('users_profile', {
    title: 'User Profile'
  });
};

// Render the sign up page
module.exports.SignUp = function(req, res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('users_Sign_up', {
    title: "ConnectEye | Sign Up"
  });
};

// Render the sign in page
module.exports.SignIn = function(req, res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('users_Sign_in', {
    title: "ConnectEye | Sign In"
  });
};

// Get the sign up data
module.exports.create = function(req, res){
  if (req.body.password != req.body.confirm_password){
    return res.redirect('back');
  }
  console.log('cnosdicc')
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user){
        return User.create(req.body);
      } else {
        return Promise.reject('User already exists');
      }
    })
    .then(user => {
      return res.redirect('/users/sign-in');
    })
    .catch(err => {
      console.log('Error in signing up:', err);
      return res.redirect('back');
    });
};

// Sign in and create a session for the user
module.exports.createSession = function(req, res){
  console.log("fdgfgd");
  return res.redirect('/');
 
};



module.exports.destroySession= function(req,res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
}

