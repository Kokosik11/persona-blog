const bcrypt = require('bcryptjs');
const UserModel = require("../models/User");
const QuestModel = require("../models/Quest");
const ViewsModel = require("../models/ViewsQuest");

exports.main = (req, res) => {
    res.render('index', { title: 'Главная' });  
}

exports.contacts = (req, res) => {
    res.render('contacts', { title: 'Контакты'});
}

exports.sendQuest = (req, res) => {
    const { emailReq, contentReq } = req.body;

    let quest = new QuestModel( { email: emailReq, content: contentReq});

    quest.save(function(err){
        if(err) return console.log(err);

        ViewsModel.findById("611ba3c7edbbf71a204976a8")
            .then((data) => {
                console.log( data)
                if(!data) {
                    let views = new ViewsModel({ _id: "611ba3c7edbbf71a204976a8", views: 1 });
                    views.save()
                }
            })

        ViewsModel.findByIdAndUpdate("611ba3c7edbbf71a204976a8", { $inc: {views: 1}}, err => {
            if(err) console.log(err);
        })

        res.redirect("/");
    });
}