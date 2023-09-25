const Post = require('../models/post');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');



//controller to show all the users who logged in
module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    // Fetch posts belonging to the user whose profile is being viewed
    let posts = await Post.find({ user: req.params.id })
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      })
      .exec();

    return res.render('users_profile', {
      title: 'User Profile',
      profile_user: user,
      posts: posts, // Pass the fetched posts to the view
    });
  } catch (err) {
    console.log('Error in retrieving user:', err);
    return res.redirect('back');
  }
};
//update profile 
module.exports.update = async function(req, res){
   

  if(req.user.id == req.params.id){

      try{

          let user = await User.findById(req.params.id);
          User.uploadedAvatar(req, res, function(err){
              if (err) {console.log('*****Multer Error: ', err)}
              
              user.name = req.body.name;
              user.email = req.body.email;

              if (req.file){
                console.log(req.file)

                  // if (user.avatar){
                  //     fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                  // }


                  // this is saving the path of the uploaded file into the avatar field in the user
                  user.avatar = User.avatarPath + '/' + req.file.filename;
              }
              user.save();
              return res.redirect('back');
          });

      }catch(err){
          req.flash('error', err);
          return res.redirect('back');
      }


  }else{
      req.flash('error', 'Unauthorized!');
      return res.status(401).send('Unauthorized');
  }
}
 

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
  req.flash('success','logged In Successfully');
  return res.redirect('/');
 
};


//sign out controller
module.exports.destroySession= function(req,res,next){
  req.logout(function(err) {
    req.flash('success','You have logged out');

    if (err) { return next(err); }
    res.redirect("/");
  });
}

