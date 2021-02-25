const Post = require('../models/post')

exports.getPosts = (req,res) => {
    // const posts = Post.find().select("_id email password")
    const posts = Post.find()
    .select("_id email password")
    .then(posts =>
    {
    res.status(200).json({ posts:posts });
    res.json({ posts:posts });
    })
    .catch(err =>console.log(err));
   
};

exports.createPost = (req,res) => {
    
//     const post = new Post(req.body);
// console.log("req data is",req)
//     post.save().then(result => {
//         const post = new Post(req.body);
//         post.save().then(result =>{
//             res.status(200).json({
//                 post:result
//             });
//         });
//     });
const post = new Post(req.body);
    post.save((err,result)=>{
        if(err){
            return res.status(400).json({
                error: err
            });
        }
                res.status(200).json({
                post: result
            });
        });
};
