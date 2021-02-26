const Post = require('../models/post')
const formiable = require('formidable')
const fs = require('fs')
const path = require('path') 
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
        console.log("fields are",fields)
        if(files.photo && fields.title && fields.body){
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
            let oldPath = files.photo.path;
            var newPath = path.join(__dirname, '../uploads') 
            + '/'+files.photo.name 
            var rawData = fs.readFileSync(oldPath) 
            fs.writeFile(newPath, rawData, function(err){ 
                if(err) console.log(err) 
                return ""
            }) 
            console.log("picture is",post.files)
        }
        else{
            return res.status(400).json({
                error:"Image could not be uploaded"
            })
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
