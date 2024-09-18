const express= require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const adminLayout = "../views/layouts/admin.ejs";
const loginLayout = "../views/layouts/admin.ejs";
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const jwtSecret = process.env.JWT_SECRET;
const Post = require("../models/Post");

router.get("/admin", async(req, res)=> {
  const locals = {title : "admin"};
  res.render("admin", { locals, layout: loginLayout })
});

//check login
//POST /admin
router.post("/admin", asyncHandler(async(req, res)=> {
  const {username, password} = req.body;
  //find user from DB
  const user = await User.findOne({username})
  //if can't find user
  if (!user) {
    return res.status(401).json({message:"Please check your username or password!"});
  }
  //if password doesn't match
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({message:"Please check your username or password!"});
  }  
  //if password match
  // if (isValidPassword) {
    const token = jwt.sign({id:user._id}, jwtSecret);
    res.cookie("token", token, {httpOnly:true});
    res.redirect("/allPosts");
  // }
  
}))

router.get("/register", async(req, res)=>{
  res.render("admin/register", {layout: loginLayout})
});

router.post("/register", asyncHandler(async(req, res)=>{
  if (!req.body.username || !req.body.password || !req.body.password2) {
    return res.send("please fill in the blank");
  };
  if (req.body.password !== req.body.password2) {
    return res.send("please check your ID or password");
  }
  if (req.body.password === req.body.password2) {
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const user = await User.create({username:req.body.username, password:hashedPassword});
    console.log(hashedPassword);
    res.json(`user created : ${user}`);
  }
}));

//admin loged in
//GET /allPosts
router.get("/allPosts", asyncHandler(async(req, res) => {
  const posts = await Post.find();
  const locals = {title : "admin"};
  res.render("admin/allPosts", {posts, locals, layout : adminLayout});
}))


module.exports= router;