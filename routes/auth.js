const express = require("express");
const {signup,signin,signout} = require("../controllers/auth");
const validator = require('../validator')
const {userById} = require("../controllers/user");

const router = express.Router();
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/signout",signout);
router.param("userId",userById)
module.exports= router;


