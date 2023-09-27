const mongoose = require('mongoose');

const categoryschema = mongoose.Schema({
    category: {
        type: String,
        required: true
    }
})

const admin = mongoose.model('category',categoryschema);

module.exports = admin;