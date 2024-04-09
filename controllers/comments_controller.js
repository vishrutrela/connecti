const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
      });
      
      await comment.save();
      if (!post.comments) {
        post.comments = []; // Initialize comments as an empty array if it's undefined
      }

      post.comments.push(comment);
      await post.save();

      
      if(req.xhr){
        return res.status(200).json({
          data:{
            comment: comment,
          },
          message: 'postcreated'
        })
      }







      req.flash('success','comment posted')
      res.redirect('/');
    } else {
      res.status(404).send('Post not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
//destroying a comment
module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id)
    .then(function (comment) {
      if (comment.user == req.user.id) {
        let postId = comment.post;

        return comment.deleteOne().then(function () {
          return Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        });
      } else {
        throw new Error('Unauthorized access');
      }
    })
    .then(function () {
      req.flash('success','comment deleted')
      return res.redirect('back');
    })
    .catch(function (err) {
      console.log('error in deleting comment:', err);
      return res.redirect('back');
    });
};
