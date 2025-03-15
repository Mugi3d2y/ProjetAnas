const express = require('express');
const router = express.Router();

const User = require('../models/User.js');
const validator = require('validator');

router.get('/login', (req, res) => {
    res.render('users/login.hbs', { error: req.session.error });
    req.session.error = null;
});

router.post('/login', (req, res) => {
    const user = User.login(req.body.email, req.body.password);
    if (user) {
        req.session.user = user;
        res.redirect('/');
    } else {
        req.session.error = 'Email ou mot de passe invalide';
        res.redirect('/users/login');
    }
});

router.get('/register', (req, res, next) => {
    console.log("USERS REGISTER");
    res.render('users/register', { errors: req.session.errors });
    req.session.errors = null;

});


router.post('/register', (req, res) => {
    const status = 'regular';
    let errors = [];
    console.log(req.body.email.endsWith('vinci.be'));
    if(!req.body.firstname){
        errors.push("Le prénom est obligatoire");
    }
    if(!req.body.surname){
        errors.push("Le nom est obligatoire");
    }
    if(!req.body.email.endsWith('vinci.be')){
        console.log("email non vinci");
        errors.push("L'email doit être de type vinci.be");
    }

    if(User.findByMail(req.body.email)){
        console.log("email déjà utilisé");
        errors.push("Cet email est déjà utilisé");
    }
    if (!validator.isStrongPassword(req.body.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols:0 ,returnScore: false})) {
        errors.push("Le mot de passe doit contenir au moins 8 caractères, 1 minuscule, 1 majuscule et 1 chiffre");
    }
    
    if(req.body.password != req.body.password_confirmation){
        errors.push( "Les mots de passe ne correspondent pas");
    }
    if(errors.length == 0){
        User.register(req.body.firstname, req.body.surname, req.body.email, req.body.password, status);
        res.redirect('/users/login');
    }
    else {
        req.session.errors = errors;
        res.redirect('/users/register');
    }

});



router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;