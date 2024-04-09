const Post = require('../models/post');
const Comment = require('../models/comment')

  

module.exports.create = function(req, res) {
  Post.create({
      content: req.body.content,
      user: req.user._id
  })
  .then(function(post) {
      if (req.xhr) {
          // If it's an AJAX request
          return res.status(200).json({
              data: {
                  post: post
              },
              message: 'Post created!'
          });
      } else {
          // If it's not an AJAX request
         
          req.flash('success', 'Post published!');
          return res.redirect('back');
      }
  })
  .catch(function(err) {
      req.flash('error', err);
      return res.redirect('back');
  });
};
console.log('postcontroller worked');


//deleting the post
module.exports.destroy = function(req, res) {
  
  Post.findById(req.params.id)
    .then(function(post) {
      if (post.user.toString() == req.user.id.toString()) {
        
         post.deleteOne();
         
         
      } else {
        throw new Error('Unauthorized access');
      }
    })
    .then(function() {
      return Comment.deleteMany({ post: req.params.id });
    })
    .then(function() {
      req.flash('success','Post deleted');
      return res.redirect('back');
    })
    .catch(function(err) {
      req.flash('error','error in deleting post');
      return res.redirect('back');
    });
};