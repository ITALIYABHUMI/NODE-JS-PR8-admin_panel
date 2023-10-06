const categorytbl = require('../model/category')
const subcategorytbl = require('../model/subcategory');

const subcategory = async (req, res) => {
    try {
        let data = await subcategorytbl.find({}).populate('categoryId');
        if (data) {
            return res.render('subcategory/subcategory', {
                data
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const addsubcategory = async (req, res) => {
    try {
        let data = await categorytbl.find({});
        if (data) {
            return res.render('subcategory/addsubcategory', {
                data
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const subcategoryAdd = async (req, res) => {
    try {
        let data = await subcategorytbl.create({
            categoryId: req.body.category,
            subcategory: req.body.subcategory
        });
        if (data) {
            req.flash('success', "Subcategory added")
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const deletesubcategory = async (req, res) => {
    try {
        id = req.params.id;
        let record = await subcategorytbl.findByIdAndDelete(id);
        if (record) {
            req.flash('success', "Record successfully deleted")
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
    }
}

const editsubcategory = async (req, res) => {
    try {
        let id = req.query.id;
        let categorey = await categorytbl.find({});
        let data = await subcategorytbl.findById(id);
        if (data, categorey) {
            return res.render('subcategory/editsubcategory', {
                data, categorey
            });
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const updatesubcategory = async (req, res) => {
    try {
        id = req.body.id;
        let updatedata = await subcategorytbl.findByIdAndUpdate(id, {
            categoryId: req.body.category,
            subcategory: req.body.subcategory
        })
        if (updatedata) {
            req.flash('update', "Record successfully Updated");
            return res.redirect('/subcategory')
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

module.exports={
    subcategory,
    addsubcategory,
    subcategoryAdd,
    editsubcategory,
    deletesubcategory,
    updatesubcategory
}