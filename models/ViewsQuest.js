const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewsSchema = new Schema({
    views: Number
})

module.exports = mongoose.model('Views', viewsSchema);