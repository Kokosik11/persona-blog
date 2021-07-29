const Post = require('../models/Post.js');

exports.blog = (req, res) => {
    Post.find({}, function(err, allPosts){
  
        if(err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.render('blog', { 
            title: 'Блог', 
            isLoad: false,
            posts: allPosts.reverse()
        });
    }).lean();
}

exports.writeBlog = (req, res) => {
    res.render('writeBlog', { title: 'Написание статьи' });  
}

exports.createBlog = (req, res) => {
    let postTitle = req.body["blog-title"];
    let postImage = req.file;
    let postContent = req.body["blog-content"];

    let post = new Post( { title: postTitle, image: postImage.path, content: postContent });

    post.save(function(err){
        if(err) return console.log(err);
        res.redirect("/blog");
    });
}
