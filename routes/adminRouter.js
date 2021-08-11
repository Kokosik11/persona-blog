const express = require("express");
const adminController = require("../controllers/adminController.js");
const adminRouter = express.Router();

const isAuth = (req, res, next) => {
    if(req.session.isAuth) next();
    else res.redirect('/');
}

adminRouter.get('/writeBlog', isAuth, adminController.writeBlog)
adminRouter.post('/createBlog', isAuth, adminController.createBlog)
adminRouter.get('/logout', isAuth, adminController.logout);
adminRouter.get('/panel', isAuth, adminController.panel);
adminRouter.post('/', adminController.adminPost);
adminRouter.get('/', adminController.admin);
    
module.exports = adminRouter;