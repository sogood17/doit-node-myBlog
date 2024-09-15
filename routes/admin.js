const express= require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const adminLayout = "../views/layouts/admin.ejs";
const loginLayout = "../views/layouts/admin.ejs";
const User = require("../models/User");

router.get("/admin", async(req, res)=> {
  const locals = {title : "admin"};
  res.render("admin", { locals, layout: loginLayout })
});


router.get("/register", async(req, res)=>{
  res.render("admin/register", {layout: loginLayout})
});

router.post("/register", asyncHandler(async(req, res)=>{
  if (!req.params.username || !req.params.password || !req.params.password2) {
    res.send("please fill in the blank")
  };
  if (req.params.username || req.params.password || req.params.password2) {
    res.send("register completed");}
}));


module.exports= router;