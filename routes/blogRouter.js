const express = require("express");
const blogController = require("../controllers/blogController.js");
const blogRouter = express.Router();

blogRouter.get('/post/:postID', blogController.post);
blogRouter.use('/', blogController.blog);

module.exports = blogRouter;