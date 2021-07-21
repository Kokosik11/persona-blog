const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const path = require('path');

app.engine('handlebars', expbs({ 
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index', { title: 'Home page'});
})

app.get('/blog', (req, res) => {
    res.render('blog', { title: 'Blog'});
})

app.get('/contacts', (req, res) => {
    res.render('contacts', { title: 'Contacts'});
})

app.listen(3000, () => {
    console.log(`Server has starting at http://localhost:${3000}`);
})