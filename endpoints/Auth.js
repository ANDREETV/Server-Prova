const express = require('express');
const routers = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/UserModel');
const passport = require('passport');

// bcriptions
const saltRounds = 10;
// jtw
const bcriptPassword = process.env.APP_PASS_BCRIPT;

routers.post('/register', (req, res, next) => {
    const password = req.body.password;
    // BCrypt HASH 
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const user = new userModel(
                {
                    ...req.body,
                    password: hash,
                    verified: false
                }
            )
            await user.save();
            return res.status(200).json(user);
        });
    });
});

routers.post('/login', async (req, res, next) => {
    const email = req.body.email;
    const userLogin = await userModel.findOne({ email: email });
    if (userLogin) {
        const password = req.body.password;
        const log = await bcrypt.compare(password, userLogin.password);
        if (log) {
            const token = jwt.sign(
                {
                    id: userLogin._id,
                    name: userLogin.name,
                    lastname: userLogin.lastname,
                    email: userLogin.email,
                },
                bcriptPassword,
                { expiresIn: '1h' }
            );
            res.status(200).json(token);
        } else {
            res.status(400).json({ error: 'Password Invalida' });
        }
    } else {
        res.status(401).json({ error: 'Invalid emmail' });
    }
});

routers.post('/autologin', (req, res, next) => {

});

routers.get('/fblogin', passport.authenticate('facebook'))


    routers.get('redirect/facebook', passport.authenticate('facebook', 
    { failureRedirect: '/register', failureMessage: true }),
    function (req, res) {
        res.redirect('/');
    });


module.exports = routers;