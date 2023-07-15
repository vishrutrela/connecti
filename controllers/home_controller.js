const Post = require('../models/post')




module.exports.home = function(req, res){
    // console.log(req.cookies);
    res.cookie('user_id', 25);
    // Post.find({})
    // .then(posts => {
    //   return res.render('home', {
    //     title: "ConnectEye | Home",
    //     posts: posts
    //   });
    // })
    // .catch(err => {
    //   console.log('Error in fetching posts:', err);
    //   return res.redirect('back');
    // });
    //populate the user of each post
    Post.find({})
    .populate('user')
    .exec()

    .then(posts => {
      return res.render('home', {
        title: "ConnectEye | Home",
        posts: posts
      });
    })
    .catch(err => {
      console.log('Error in fetching posts:', err);
      return res.redirect('back');
    });
} ;
    


