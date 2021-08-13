const PostModel = require('../models/Post.js');

exports.blog = (req, res) => {
    PostModel.find({}, function(err, allPosts){

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

exports.post = (req, res) => {
    const { postID } = req.params;
    PostModel.findById(postID, (err, post) => { 
        if(err) console.log(err);
        
        res.render("post", {
            title: post.title,
            post: post
        });
    }).lean();
}