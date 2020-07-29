const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/jwt');
const User = require('../models/user')

// Register
router.post('/register', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.getUSerByUsername(newUser.username, (err, user) => {
        if(err){
          res.json({success: false, msg:'Something went wrong'});
        }
        if(user){
          return res.json({success: false, msg: 'Username taken, Please select a new username'});
        } else {
            User.getUSerByEmail(newUser.email, (err, user) => {
                if(err){
                  res.json({success: false, msg:'Something went wrong'});
                }
                if(user){
                    return res.json({success: false, msg: 'Email is already registered. Please use another email or try to login.'});
                } else {
                  User.addUser(newUser, (err, user) => {
                    if(err){
                        res.json({success: false, msg:'failed to register user'});
                    } else {
                        res.json({success: true, msg:'User was successfully registered'});
                    }
                });
            }}); 
        }
    });
});

// Delete
router.post('/delete', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const username = req.body.username || '';
    User.getUSerByUsername(username, (err, user) => {
        if (err) {
            return res.json({success: false, msg:'User query went wrong'});
        }
        if (!user) {
            return res.json({success: false, msg:'No such user'});
        }
        User.delUser(user, (err, user) => {
            if (err) {
                return res.json({success: false, msg: 'Delete failed'});
            }
            return res.json({success: true, msg: 'User deleted'});
        });
    });
});

// List
router.get('/list', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.getAllUsers((err, arr) => {
        if (err) {
            res.json({success: false, msg:'Couldn\'t find users in db'});
        }
        if (!arr || arr.length === 0) {
            res.json({success: false, msg:'No users to list'});
        }
        const users = arr.map(u => {
            return {
                username: u.username, 
                name: u.name
            }
        });
        res.json({success: true, users: users});
    });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUSerByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePasswords(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // 1week
                });

                res.json({
                    success: true,
                    msg: 'Authentication successful',
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email

                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'})
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user}); /* what ? */
});

// Get
router.post('/get', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const _id = req.body._id;
    User.getUSerById(_id, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get user'});
        } 
        if (!user) {
            res.json({success: false, msg: 'No such user'});
        } else {
            const username = user.username ? user.username : 'unknown user';
            const ret = {
                name: user.name || username,
                username: username,
            }
            res.json({success: true, user: ret});
        }
    });
});

// Create Teemu Testaaja if no users are created
router.get('/getInitialTeemu', (req, res, next) => {
    const teemu = new User({
        name: "Teemu Testaaja",
        email: "teemu@name.test",
        username: "teemu",
        password: "1111"
    });
    User.getUSerByUsername(teemu.username, (err, user) => {
        if(err){
            res.json({success: false, msg:'something went wrong'});
        }
        if(user){
            return res.json({success: false, msg: 'Teemu created already'});
        } else {
            User.addUser(teemu, (err, user) => {
                if(err){
                    res.json({success: false, msg:'Failed to register user'});
                } else {
                    res.json({success: true, msg:'Teemu was successfully registered'});
                }
            });
        }
    });
});

module.exports = router;
