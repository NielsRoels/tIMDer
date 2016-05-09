var express = require('express');
var router = express.Router();
var path = require('path');

var isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = function(passport){
    router.get('/', function(req, res){
        res.render('index', {title : 'Welcome | tIMDr'});
    });

    router.get('/who', function(req, res){
        res.render('user/who', {title : 'Who are you? | tIMDr'});
    });


    router.get('/login', function(req, res){
        res.render('passport/login', {title: "Student login | tIMDr", message : req.flash('message')});
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/user',
        failureRedirect: '/login',
        failureFlash : true
    }));

    router.get('/signup', function(req, res){
        res.render('passport/register', {title: "Register now! | tIMDr", message : req.flash('message')});
    });

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/addpictures',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    router.get('/addpictures', isAuthenticated, function(req, res){
        res.render('user/addpictures.jade', {title: "Add pictures | tIMDr", user: req.user});
    });

    router.get('/user', isAuthenticated, function(req, res){
        res.render('user/index', {title:"Dashboard | tIMDr", user : req.user});
    });

    router.get('/profile', isAuthenticated, function(req, res){
        res.render('user/profile', {title:"Your profile | tIMDr", user : req.user});
    });

    router.get('/admin', isAuthenticated, function(req, res){
        res.render('user/admin', {title: 'Admin dashboard | tIMDr'});
    });

    router.get('/signout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    router.get('/edit', isAuthenticated, function(req, res){
        res.render('user/editprofile', {title:"Edit profile | tIMDr", user : req.user});
    });

    router.get('/slides', function(req, res){
        res.render('company/slides', {title : 'Student profile | tIMDr'});
    });

    router.get('/nostudent', function(req, res){
        res.render('company/nostudent', {title : 'Geen studenten meer! | tIMDr'});
    });

    router.get('/dates', function(req, res){
        res.render('user/dates', {title : 'Dates | tIMDr'});
    });

    router.get('/userdate', isAuthenticated, function(req, res){
        res.render('user/userdate', {title: 'Your dates | tIMDr', user : req.user});
    });

    return router;
}