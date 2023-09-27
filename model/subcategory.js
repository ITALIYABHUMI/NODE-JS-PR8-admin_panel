const mongoose = require('mongoose');

const subcategoryschema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    subcategory: {
        type: String,
        required: true
    }
})

const subcategory = mongoose.model('subcategory', subcategoryschema);

module.exports = subcategory;