exports.main = (req, res) => {
    res.render('index', { title: 'Главная' });  
}

exports.contacts = (req, res) => {
    res.render('contacts', { title: 'Контакты'});
}