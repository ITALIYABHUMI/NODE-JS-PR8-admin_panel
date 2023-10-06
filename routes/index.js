const express = require('express');
const multer = require('multer');
const passport = require('passport');

const file = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const imagedata = multer({ storage: file }).single('image');

const routs = express.Router();

const indexcontroller = require('../controller/indexcontroller');
const categorycontroller = require('../controller/categorycontroller');
const subcategorycontroller = require('../controller/subcategorycontroller');
const productcontroller = require('../controller/productcontroller');

routs.get('/', indexcontroller.login);
routs.post('/logindata', passport.authenticate('local', { failureRedirect: '/' }), indexcontroller.logindata);
routs.get('/register', indexcontroller.register);
routs.post('/registerdata', indexcontroller.registerdata);
routs.get('/index', passport.checkAuthentication, indexcontroller.index);
routs.get('/profile', passport.checkAuthentication, indexcontroller.profile);
routs.get('/editprofile', passport.checkAuthentication, indexcontroller.editprofile);
routs.post('/updateprofile', passport.checkAuthentication, indexcontroller.updateprofile);
routs.get('/forgotpassword', indexcontroller.forgotpassword);
routs.post('/editdata', indexcontroller.editdata);
routs.get('/changepassword', indexcontroller.changepassword);
routs.post('/passwordData', indexcontroller.passwordData);
routs.get('/otp', indexcontroller.otp);
routs.post('/otpdata',indexcontroller.otpdata);
routs.get('/newpassword',  indexcontroller.newpassword);
routs.post('/updatepassword', passport.checkAuthentication, indexcontroller.updatepassword);
routs.get('/logout', indexcontroller.logout);


routs.get('/categories', passport.checkAuthentication, categorycontroller.categories);
routs.get('/addcategories', passport.checkAuthentication, categorycontroller.addcategories);
routs.post('/categoriesAdd', passport.checkAuthentication, categorycontroller.categoriesAdd);
routs.get('/deletecategory/:id', passport.checkAuthentication, categorycontroller.deletecategory);
routs.get('/editcategory', passport.checkAuthentication, categorycontroller.editcategory);
routs.post('/updatecategory', passport.checkAuthentication, categorycontroller.updatecategory);

routs.get('/subcategory', passport.checkAuthentication, subcategorycontroller.subcategory);
routs.get('/addsubcategory', passport.checkAuthentication, subcategorycontroller.addsubcategory);
routs.post('/subcategoryAdd', passport.checkAuthentication, subcategorycontroller.subcategoryAdd);
routs.get('/deletesubcategory/:id', passport.checkAuthentication, subcategorycontroller.deletesubcategory);
routs.get('/editsubcategory', passport.checkAuthentication, subcategorycontroller.editsubcategory);
routs.post('/updatesubcategory', passport.checkAuthentication, subcategorycontroller.updatesubcategory);

routs.get('/product', passport.checkAuthentication, productcontroller.product);
routs.get('/addproduct', passport.checkAuthentication, productcontroller.addproduct);
routs.post('/productAdd', passport.checkAuthentication, imagedata, productcontroller.productAdd);
routs.get('/editproduct', passport.checkAuthentication, productcontroller.editproduct);
routs.post('/updateproduct', passport.checkAuthentication, imagedata, productcontroller.updateproduct);
routs.get('/deleteproduct/:id', passport.checkAuthentication, productcontroller.deleteproduct);


module.exports = routs;