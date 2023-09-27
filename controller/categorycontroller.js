const fs = require('fs');
const path = require('path');

const categorytbl = require('../model/category')

const categories = async (req, res) => {
    try {
        let data = await categorytbl.find({});
        if (data) {
            return res.render('category/categories', {
                data
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const addcategories = (req, res) => {
    return res.render('category/addcategories');
}

const categoriesAdd = async (req, res) => {
    const { category } = req.body;
    try {
        let data = await categorytbl.create({
            category: category
        })
        if (data) {
            console.log("category is added");
            req.flash('success', "category is added");
            return res.redirect('back');
        }
        else {
            console.log("category is not added");
            req.flash('error', "category is not added");
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const deletecategory = async (req, res) => {
    try {
        id = req.params.id;
        let record = await categorytbl.findByIdAndDelete(id);
        if (record) {
            req.flash('success', "Record successfully deleted")
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
    }
}

const editcategory = async (req, res) => {
    try {
        id = req.query.id;
        let record = await categorytbl.findById(id);
        if (record) {
            return res.render('category/editcategory', {
                record
            });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updatecategory = async (req, res) => {
    try {
        id = req.body.id;
        let updatedata = await categorytbl.findByIdAndUpdate(id, {
            category: req.body.category
        })
        if (updatedata) {
            req.flash('update', "Record successfully Updated");
            return res.redirect('/categories')
        }
        else {
            req.flash('error', "Record not Updated");
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}





module.exports = {
    categories,
    addcategories,
    categoriesAdd,
    deletecategory,
    editcategory,
    updatecategory,
}