const express= require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const adminLayout = "../views/layouts/admin.ejs";

router.get("/admin", asyncHandler((req, res)=> {
  res.render("admin", { layout: adminLayout })
}));

module.exports= router;