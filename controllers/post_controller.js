const Post = require('../models/post');

module.exports.create = (req, res) => {
    if (!req.user || !req.user._id) {
        console.log('Invalid user or user ID is missing');
        return res.redirect('back');
      }
    
  Post.create({
    content: req.body.content,
    user: req.user._id
  })
    .then(post => {
      return res.redirect('back');
    })
    .catch(err => {
      console.log('Error in creating the post:', err);
      return res.redirect('back');
    });
};
console.log('postcontroller worked');
