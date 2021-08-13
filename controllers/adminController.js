const bcrypt = require('bcryptjs');

const PostModel = require('../models/Post.js');
const { update } = require('../models/User');
const UserModel = require("../models/User");

// const editor = new Quill

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
    PostModel.find({}, function(err, allPosts){

        if(err) {
            console.log(err);
            return res.sendStatus(400);
        }

        res.render('adminPanel', { title: "Admin Panel", posts: allPosts.reverse() });

    }).lean();
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

exports.deletePost = (req, res) => {
    const { postID } = req.params;

    console.log(postID);

    PostModel.findByIdAndDelete(postID, (err) => {
        console.log(err);
    }).lean();
}

exports.updatePostPage = (req, res) => {
    const { postID } = req.params;

    PostModel.findById(postID, (err, post) => {
        if(err) console.log(err);
        
        res.render("updatePost", {
            title: post.title,
            post: post
        });
    }).lean();
}

exports.updatePost = (req, res) => {
    const { postID } = req.params;
    let postTitle = req.body["blog-title"];
    let postImage = req.file;
    let postContent = req.body["blog-content"];

    console.log(postID);

    // let updatePost = new PostModel(postTitle, postImage, postContent);
    let updatePost = {};
    updatePost.title = postTitle;
    if(postImage) updatePost.image = postImage;
    updatePost.content = postContent;

    PostModel.findByIdAndUpdate(postID, updatePost, (err) => {
        if(err) console.log(err);
    }).lean();
}