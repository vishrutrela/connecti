const User = require('../models/user');
//profile page viewed after sign in
module.exports.profile = (req, res) => {
   return res.render('profile',{
    title:'profile'
   })
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
 