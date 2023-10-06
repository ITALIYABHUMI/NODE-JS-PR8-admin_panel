const categorytbl = require('../model/category')
const subcategorytbl = require('../model/subcategory');
const producttbl = require('../model/product');
const fs = require('fs');

const product = async (req, res) => {
    try {
        let data = await producttbl.find({}).populate('categoryId').populate('subcategoryId');
        if (data) {
            return res.render('product/product', {
                data
            });
        }
    } 
    catch (err) {
        console.log(err);
        return false;
    }
}

const addproduct = async (req, res) => {
    try {
        let categorydata = await categorytbl.find({});
        let subcategorydata = await subcategorytbl.find({});
        if (categorydata, subcategorydata) {
            return res.render('product/addproduct', {
                categorydata,
                subcategorydata
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const productAdd = async (req, res) => {
    let image = "";
    if (req.file) {
        image = req.file.path;
    }
    try { 
        let data = await producttbl.create({
            categoryId: req.body.category,
            subcategoryId: req.body.subcategory,
            product: req.body.product,
            image: image,
            qty: req.body.qty,
            price: req.body.price,
            description: req.body.description
        });
        if (data) {
            req.flash('success', "product added")
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
const editproduct = async (req, res) => {
    try {
        let id = req.query.id;
        let category = await categorytbl.find({});
        let subcategory = await subcategorytbl.find({});
        let data = await producttbl.findById(id);
        if (data, category, subcategory) {
            return res.render('product/editproduct', {
                data, category, subcategory
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
  
const updateproduct = async (req, res) => {
    try {
        const { id, category, subcategory, product, qty, price, description } = req.body;
        if (req.file) {
            let imagedata = await producttbl.findById(id);
            if (imagedata) {
                fs.unlinkSync(imagedata.image);
                let image = req.file.path;
                let updatedata = await producttbl.findByIdAndUpdate(id, {
                    categoryId: category,
                    subcategoryId: subcategory,
                    product: product,
                    image: image,
                    qty: qty,
                    price: price,
                    description: description
                })
                if (updatedata) {
                    req.flash('update', "Record successfully Updated");
                    return res.redirect('/product')
                }
                else {
                    req.flash('error', "Record not Updated");
                    return res.redirect('back')
                }
            }
        }
        else {
            let imageupdate = await producttbl.findById(id);
            if (imageupdate) {
                let image = imageupdate.path;
                let updatedata = await producttbl.findByIdAndUpdate(id, {
                    categoryId: category,
                    subcategoryId: subcategory,
                    product: product,
                    image: image,
                    qty: qty,
                    price: price,
                    description: description
                })
                if (updatedata) {
                    req.flash('update', "Record successfully Updated");
                    return res.redirect('/product')
                }
                else {
                    req.flash('error', "Record not Updated");
                    return res.redirect('back')
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const deleteproduct = async (req, res) => {
    try {
        id = req.params.id;
        let record = await producttbl.findByIdAndDelete(id);
        if (record) {
            fs.unlinkSync(record.image)
            req.flash('success', "Record successfully deleted")
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    product,
    addproduct,
    productAdd,
    editproduct,
    updateproduct,
    deleteproduct
}