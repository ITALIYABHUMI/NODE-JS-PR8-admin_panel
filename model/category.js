const mongoose = require('mongoose');

const categoryschema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 1
    }
})

const admin = mongoose.model('category', categoryschema);

module.exports = admin;