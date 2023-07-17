const Post = require('../models/post');
const Comment = require('../models/comment')
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


//deleting the post
module.exports.destroy = function(req, res) {
  
  Post.findById(req.params.id)
    .then(function(post) {
      if (post.user.toString() == req.user.id.toString()) {
        console.log(post);
         post.deleteOne();
         
      } else {
        throw new Error('Unauthorized access');
      }
    })
    .then(function() {
      return Comment.deleteMany({ post: req.params.id });
    })
    .then(function() {
      return res.redirect('back');
    })
    .catch(function(err) {
      return res.redirect('back');
    });
};