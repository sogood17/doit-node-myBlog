const express= require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const adminLayout = "../views/layouts/admin.ejs";
const loginLayout = "../views/layouts/admin.ejs";
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/admin", async(req, res)=> {
  const locals = {title : "admin"};
  res.render("admin", { locals, layout: loginLayout })
});


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


module.exports= router;