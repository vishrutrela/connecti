const User = require('../models/user');
//profile page viewed after sign in
module.exports.profile = (req, res) => {
    if (req.cookies.user_id) {
      User.findById(req.cookies.user_id)
        .then((user) => {
          if (user) {
            return res.render('profile', {
              title: 'Profile',
              user: user,
            });
          } else {
            return res.redirect('/users/sign-in');
          }
        })
        .catch((err) => {
          console.log('Error in finding the user', err);
          return res.redirect('/users/sign-in');
        });
    }
    //if id not found it returns to sign in Page 
    else {
      return res.render('/users/sign-in');
    }
  };
  
        
        
   

//render the sign up page
module.exports.Signup = (req,res)=>{
    return res.render('users_Sign_up',{
        title: 'Connecteye | Sign up'
    })
}
//render the sign in PAGE
module.exports.Signin = (req,res)=>{
    return res.render('users_Sign_in',{
        title: 'Connecteye | Sign in'
    })
}

//get the sign up data
module.exports.create = (req, res) => {
    const { password, confirm_password, text, email } = req.body;
    console.log(req.body)
    if (password != confirm_password) {
      return res.redirect('back');
    }
  
    User.findOne({email})
      .then((user) => {
        if (!user) {
          return User.create(req.body)
            .then((user) => {
              return res.redirect('/users/sign-in');
            })
            .catch((err) => {
              console.log('error in creating the user in signing up', err);
              return res.redirect('back');
            });
        } else {
          return res.redirect('back');
        }
      })
      .catch((err) => {
        console.log('error in finding the user in signing up', err);
        return res.redirect('back');
      });
  };
  

  //sign in
  module.exports.createSession = (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email })
      .then((user) => {
        if (user) {
          if (user.password != password) {
            return res.redirect('back');
          }
          res.cookie('user_id', user._id);
          return res.redirect('/users/profile');
        } else {
          return res.redirect('back');
        }
      })
      .catch((err) => {
        console.log('error in finding the user in signing in', err);
        return res.redirect('back');
      });
  };

  //signout
  module.exports.Signout= function(req,res){
    console.log('signout c accessed')
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in')
  }
  