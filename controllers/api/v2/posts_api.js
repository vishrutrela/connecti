const Post = require('../../../models/post');
const { post } = require('../../../routes/api/v2');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
    
  .populate('user')
  .populate({
    path: 'comments',
    populate: {
      path: 'user',
      
    }
  });
  

    console.log('NIEWUC');
    return res.json(200,{
        message:"list of post",
        posts: posts
    }) 
}