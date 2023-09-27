const registertbl = require('../model/form');
const nodemailer = require('nodemailer');
var cookie = require('cookie-parser');
const passport = require('passport');


const index = (req, res) => {
    return res.render('index')
}

const register = (req, res) => {
    return res.render('admin/register')
}

const login = (req, res) => {
    if (res.locals.users) {
        return res.redirect('index');
    }
    return res.render('admin/login')
}

const logindata = (req, res) => {
    return res.redirect('/index');
}

const registerdata = async (req, res) => {
    const { name, email, password, cpassword } = req.body;
    if (password == cpassword) {
        try {
            let data = await registertbl.create({
                name: name,
                email: email,
                password: password,
            })
            if (data) {
                req.flash('success', 'You are registered');
                return res.redirect('back');
            }
            else {
                req.flash('error', 'You are not registered');
                return res.redirect('back')
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    else {
        req.flash('error', 'password and confirm password is not same');
        return res.redirect('back')
    }
}
const profile = (req, res) => {
    return res.render('admin/profile');
}

const editprofile = async (req, res) => {
    try {
        id = req.query.id;
        let record = await registertbl.findById(id);
        if (record) {
            return res.render('admin/editprofile', {
                record
            });
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updateprofile = async (req, res) => {
    try {
        const { id, name, email, password } = req.body;
        const data = await registertbl.findByIdAndUpdate(id, {
            name: name,
            email: email,
            password: password,
        });
        if (data) {
            req.flash('success', 'Your profile Updated');
            return res.redirect('/profile');
        }
        return res.redirect('back')
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const forgotpassword = (req, res) => {
    return res.render('admin/edit');
}

const editdata = async (req, res) => {
    try {
        let record = await registertbl.findOne({ email: req.body.email });
        let nodemailer = require('nodemailer');
        if (record) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'italiyabhumi05@gmail.com',
                    pass: 'xdbqycnjsfsytaoq'
                }
            });
            let otp = Math.floor(Math.random() * 100000);
            var mailOptions = {
                from: 'italiyabhumi05@gmail.com',
                to: req.body.email,
                subject: 'Sending Email using Node.js',
                text: 'Your otp :- ' + otp
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    let obj = {
                        email: req.body.email,
                        otp: otp
                    }
                    console.log('Email sent: ' + info.response);
                    res.cookie('forgetpassword', obj)
                    return res.redirect('/otp')
                }
            });

        } else {
            req.flash('mail', 'Email not found')
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const changepassword = (req, res) => {
    return res.render('admin/editpassword')
}

const otp = (req, res) => {
    return res.render('otp');
}

const otpdata = (req, res) => {
    let cookieotp = req.cookies['forgetpassword'].otp;
    let otp = req.body.otp;
    if (cookieotp == otp) {
        return res.redirect('/newpassword')
    } else {
        req.flash('otp', 'otp is wrong');
        return res.redirect('back');
    }
}

const newpassword = (req, res) => {
    return res.render('admin/newpassword');
}

const updatepassword = async (req, res) => {
    const { password, cpassword } = req.body;
    if (password == cpassword) {
        try {
            let email = req.cookies['forgetpassword'].email;
            const updateEmail = await registertbl.findOne({ email: email })
            let id = updateEmail.id;
            const updatepass = await registertbl.findByIdAndUpdate(id, {
                password: password
            })
            // const updateEmail = await registertbl.findOneAndUpdate({
            //     email: email,
            //     password: password
            // })
            if (updatepass) {
                res.clearCookie('forgetpassword');
                return res.redirect('/')
            }
            else {
                console.log("Password not changed");
                return res.redirect('back')
                return false;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    else {
        req.flash('error', 'password and confirm password is not same');
        return res.redirect('back')
    }

}

const passwordData = async (req, res) => {
    let id = req.body.id;
    console.log(id);
    const { password, cpassword } = req.body;
    if (password == cpassword) {
        try {
            let data = await registertbl.findByIdAndUpdate(id, {
                password: password,
            })
            if (data) {
                return res.redirect('/index');
            }
            else {
                return res.redirect('back')
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    else {
        console.log("password and confirm password is not same");
        return false;
    }
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return res.redirect('/');
    })
}
module.exports = {
    index,
    login,
    logindata,
    registerdata,
    register,
    profile,
    editprofile,
    updateprofile,
    changepassword,
    editdata,
    passwordData,
    forgotpassword,
    otp,
    otpdata,
    newpassword,
    updatepassword,
    logout
}