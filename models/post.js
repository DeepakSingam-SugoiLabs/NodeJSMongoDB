const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    email:{
        type:String,
        required:"email is required",
        minlength:3,
        maxlength:150
    },
    password:{
        type:String,
        required:"password is required",
        minlength:4,
        maxlength:2000
    }

});

module.exports = mongoose.model("Post", postSchema);