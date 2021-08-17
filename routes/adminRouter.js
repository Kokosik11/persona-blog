const express = require("express");
const adminController = require("../controllers/adminController.js");
const adminRouter = express.Router();

const isAuth = (req, res, next) => {
    if(req.session.isAuth) next();
    else res.redirect('/');
}

const isAuthAdmin = (req, res, next) => {
    if(req.session.isAuth) res.redirect('/admin/panel');
    else next(); 
}

adminRouter.post('/quests/:questID/delete', isAuth, adminController.deleteQuest);
adminRouter.get('/quests', isAuth, adminController.quests);
adminRouter.post('/changePass', isAuth, adminController.changePassPOST);
adminRouter.get('/changePass', isAuth, adminController.changePassGET);
adminRouter.post('/post/:postID/update', isAuth, adminController.updatePost);
adminRouter.get('/post/:postID/update', isAuth, adminController.updatePostPage);
adminRouter.post('/post/:postID/delete', isAuth, adminController.deletePost);
adminRouter.get('/post/add', isAuth, adminController.writeBlog);
adminRouter.post('/createBlog', isAuth, adminController.createBlog);
adminRouter.get('/logout', isAuth, adminController.logout);
adminRouter.get('/panel', isAuth, adminController.panel);
adminRouter.post('/', adminController.adminPost);
adminRouter.get('/', isAuthAdmin, adminController.admin);
    
module.exports = adminRouter;
