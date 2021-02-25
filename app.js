const express = require('express');
const mongoose = require('mongoose')
const morgan = require("morgan");
const dotenv = require('dotenv');
const { Mongoose } = require('mongoose');
const cookieParser  = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


const app = express();

dotenv.config() 
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: 
    true },{ useUnifiedTopology: true })    
.then(()=>console.log("db connected"))
mongoose.connection.on('error',err=>{
    console.log(`db connection error: ${err.message}`)
});
const PostRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use('/',PostRoutes);
app.use('/',authRoutes);
app.use('/',userRoutes);


const port = process.env.PORT || 8080;
app.listen(port ,() =>{
    console.log(`Node JS ${port}`)
});