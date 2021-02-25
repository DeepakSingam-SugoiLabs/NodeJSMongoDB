const mongoose = require('mongoose')
const uuid = require('uuid').v4
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt: String,
    created:{
        type:Date,
        default:Date.now()

    },
    updated: Date

});
userSchema.virtual('password')
.set(function(password){
    //temp var
    this._password = password;
    //timestamp
    this.salt = uuid();
    //encrypt
    this.hashed_password = this.encrytPassword(password);
})
.get(function(){
    return this._password;
});
//methods
userSchema.methods= {
    authenticate: function(plainText){
        return this.encrytPassword(plainText) === this.hashed_password
    },
    encrytPassword: function(password)
    {
        if(!password)
           return "";
        try{
            return crypto.createHmac('sha1',this.salt).update(password).digest('hex');
        }
        catch(err){
            return "";
        }
    }
};
module.exports = mongoose.model("User", userSchema); 