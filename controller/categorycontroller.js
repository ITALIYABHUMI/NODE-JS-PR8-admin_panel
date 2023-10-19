const fs = require('fs');
const path = require('path');

const categorytbl = require('../model/category');
const subcategorytbl = require('../model/subcategory');
const producttbl = require('../model/product');

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
            req.flash('success', "category is added");
            return res.redirect('back');
        }
        else {
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
        let id = req.params.id;
        const category = await categorytbl.findByIdAndRemove(id);
        if (!category) {
            req.flash('error', "category not found");
        }
        else {
            await subcategorytbl.deleteMany({ categoryId: id });
            await producttbl.deleteMany({ categoryId: id });
            req.flash('success', "Category and related subcategories deleted successfully");
        }
    } catch (err) {
        console.error(err);
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
  
const categorystatus = async (req, res) => {
    try { 
        id = req.params.id; 
        console.log(id);
        let data = await categorytbl.find({});
        if (data[0].status == 1) {
            let updatedata = await categorytbl. findByIdAndUpdate(id, {
                status: 0
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
        else {
            let updatedata = await categorytbl.findByIdAndUpdate(id, {
                status: 1
            })
            console.log(updatedata);
            if (updatedata) {
                req.flash('update', "Record successfully Updated");
                return res.redirect('/categories')
            }
            else {
                req.flash('error', "Record not Updated");
                return res.redirect('back')
            }
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
    categorystatus
}