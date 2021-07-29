const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postScheme = new Schema({
    title: String,
    image: String,
    content: String
});

module.exports = mongoose.model("Post", postScheme);