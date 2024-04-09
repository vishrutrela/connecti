const mongoose = require('mongoose');
const nodemailer = require('nodemailer')

const postSchema =  new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    //include the array of ids of all comments in this post schema itself
    comments: [
       {
           type:mongoose.Schema.Types.ObjectId,
           ref : 'Comment'
       }
    ] 
},{
  timestamps: true
});

//post middleware

postSchema.post("save",async function(doc){
    try{
        console.log(doc)

    }catch(error){

    }

})

const Post = mongoose.model('Post',postSchema);

module.exports = Post;