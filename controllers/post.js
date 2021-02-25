const Post = require('../models/post')
const formiable = require('formidable')
const fs = require('fs')
exports.getPosts = (req,res) => {
    // const posts = Post.find().select("_id email password")
    const posts = Post.find().populate("postedBy","_id ")
    .select("_id title body photo")
    .then(posts =>
    {
    res.status(200).json({ posts:posts });
    res.json({ posts:posts });
    })
    .catch(err =>console.log(err));
   
};

exports.createPost = (req,res,next) => {
  
let form = new formiable.IncomingForm();
form.keepExtensions = true
form.parse(req,(err,fields,files)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Image could not be uploaded"
            })
        }
        
        let post = new Post(fields)
        post.postedBy = req.profile
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }
        post.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            res.json(result)
        })
    })


};
