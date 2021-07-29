const express = require("express");
const blogController = require("../controllers/blogController.js");
const blogRouter = express.Router();

blogRouter.use('/writeBlog', blogController.writeBlog)
blogRouter.use('/createBlog', blogController.createBlog)
blogRouter.use('/', blogController.blog);
    
module.exports = blogRouter;