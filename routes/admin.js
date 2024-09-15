const express= require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const adminLayout = "../views/layouts/admin.ejs";
const loginLayout = "../views/layouts/admin.ejs";

router.get("/admin", asyncHandler((req, res)=> {
  const locals = {title : "admin"};
  res.render("admin", { locals, layout: loginLayout })
}));

module.exports= router;