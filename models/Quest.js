const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Quest', questSchema);