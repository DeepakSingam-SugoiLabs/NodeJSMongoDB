const jwt = require('jsonwebtoken')
require("dotenv").config();
const expressJwt = require('express-jwt')
const User = require("../models/user");

exports.signup = async(req,res)=>{
    const userExists = await User.findOne({email: req.body.email})
    if(userExists)
    return res.status.json(403).json({
        error:"Email is taken!"
    })
    const user = await new User(req.body); 
    await user.save();
    res.status(200).json({message:"Sign-up successful"});
};

exports.signin = (req,res) =>
{   console.log("req body",req.body)
    const {email,password} = req.body
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(401).json({
                error:"User does not exists"
            })
        }
        if(!user.authenticate(password))
        {   console.log("value",user.authenticate(password))
            return res.status(401).json({
                error:"Email and pass dont match"
            })
        }
        const token = jwt.sign({_id:user._id},`${process.env.JWT_SECRET}`);
        res.cookie("t",token,{expire: new Date()+999});
        const {_id,name,email} = user;
        return res.json({token,user:{_id,email,name}});
    });

};

exports.signout = (req,res) =>
{
    res.clearCookie("t");
    return res.json({message:"Signout success"});
};

exports.requireSignin = expressJwt({

    secret: `${process.env.JWT_SECRET}`, algorithms: ['sha1', 'RS256', 'HS256'] ,
    userProperty: "auth"
})