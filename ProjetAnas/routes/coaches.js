const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach.js');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const date = new Date();
        const uniquePrefix = date.getFullYear() + '-' + (date.getMonth() + 1) + 
        '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() + 
        '-' + date.getSeconds();
        cb(null, uniquePrefix + '-' + file.originalname);
    }
})
const upload = multer({ storage: storage });


//affiche tout les coachs existants
router.get('/list',(req, res) => {
    const i = 'coach';
    const coaches = Coach.list(i);
    res.render('coaches/list.hbs',{coaches});
});


//affiche la biographie d'un coach
router.get('/bio',(req, res) => {
    const i = parseInt(req.query.id);
    const coach = Coach.FindCoach(i);
    if(isNaN(i)){
        res.render('coaches/error.hbs');
    } else if(coach===undefined){
        res.render('coaches/error.hbs');
    }
    res.render('coaches/bio.hbs',{coach});
});


//envoie un message à un coach
router.post('/message',(req, res) => {
    const coachId = parseInt(req.body.coach_id);
    const userId = parseInt(req.body.user_id);
    Coach.sendMessage(userId,coachId,req.body.message);
    res.redirect(`/coaches/messages`);
});

router.get('/update',(req, res) => {
    console.log(req.session.user);
    if(req.session.user===undefined){
        res.redirect('/coaches/list');
    }else if(req.session.user.status==='coach'){
        const id = parseInt(req.query.coach_id);
        const coach = Coach.FindCoach(id);
        res.render('coaches/update.hbs',{coach});
    } else {
        res.redirect('/coaches/list');
    }
});


router.post('/update', upload.single('profileImage'), (req, res)=>{
    if (req.body.newBio === ""){
        req.body.newBio = null;
    }
    if (req.file) {
        Coach.editCoach(req.body.user_id,req.body.newBio,'images/' + req.file.filename);
    } else {
        Coach.editCoach(req.body.user_id,req.body.newBio,null);
    }
    if(req.session.user){
        res.redirect(`/coaches/bio?id=${req.body.user_id}`);
    } else {
        res.redirect('/coaches/list');
    }
});


module.exports = router;