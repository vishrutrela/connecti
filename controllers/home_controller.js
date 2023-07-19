const Post = require('../models/post')
const User = require('../models/user');



module.exports.home = function (req, res) {
  Post.find({})
  .populate('user')
  .populate({
    path: 'comments',
    populate: {
      path: 'user'
    }
  })
  .exec()
  .then(function (posts) {
    return User.find({}).then(function (users) {
      return res.render('home', {
        title: "ConnectEye | Home",
        posts: posts,
        all_users: users
      });
    });
  })
  .catch(function (err) {
    console.log('Error in retrieving posts or users:', err);
    return res.redirect('back');
  });
};
