const express = require('express');
const expbs = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

let { context } = require('./helpers/helpers.js');

const homeRouter = require("./routes/homeRouter.js");
const blogRouter = require("./routes/blogRouter.js");

let contextKeys = Object.keys(context);

contextKeys.forEach(key => {
    Handlebars.registerHelper(key, context[key]);
})

app.engine('handlebars', expbs({ 
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({dest:"static/image/post"}).single("blog-image"));

app.use('/', homeRouter);
app.use('/blog', blogRouter);

app.use((req, res, next) => {
    res.status(404).send("Not found");
})

// app.listen(3000, () => {
//     console.log(`Server has starting at http://localhost:${3000}`);
// })

mongoose.connect("mongodb://localhost:27017/postsdb", { useUnifiedTopology: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});