const bcrypt = require('bcryptjs');
const PostModel = require('../models/Post.js');
const UserModel = require("../models/User");

exports.admin = async (req, res) => {
    // const hashedPsw = await bcrypt.hash("qwerty123", 12);
    // let admin = new UserModel( {login: "admin", password: hashedPsw} );
    // admin.save();

    res.render('admin', { title: 'Admin panel' });
}

exports.adminPost = (req, res) => {
    const { login, password } = req.body;

    let admin = UserModel.findOne({ login }, (err, admin) => {
        if(!admin) { 
            return res.redirect('/admin');
        }
        
        const isMatch = bcrypt.compareSync(password, admin.password);
        if(!isMatch) return res.redirect('/admin');
    
        req.session.isAuth = true;
        res.redirect('/admin/panel');
    });
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if(err) throw err;
    })
    res.redirect("/admin");
}

exports.panel = (req, res) => {
    res.render('adminPanel', { title: "Admin Panel" });
}


exports.writeBlog = (req, res) => {
    res.render('writeBlog', { title: 'Написание статьи' });  
}

exports.createBlog = (req, res) => {
    let postTitle = req.body["blog-title"];
    let postImage = req.file;
    let postContent = req.body["blog-content"];

    let post = new PostModel( { title: postTitle, image: postImage.path, content: postContent });

    post.save(function(err){
        if(err) return console.log(err);
        res.redirect("/blog");
    });
}