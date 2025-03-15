const express = require('express');
const router = express.Router();
const Tournaments = require("../models/Tournament.js");
const Coach = require("../models/Coach.js");
const e = require('express');
const multer = require('multer')


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



router.get('/', (req, res) => {
    console.log("Je passe par la route /");
    const tournaments = Tournaments.list();
    res.render('tournaments/list.hbs',{tournaments});
  });



  router.get('/details', function (req, res, next) {
    console.log("GET DETAILS TOURNAMENT");
    const tournamentIdParam = parseInt(req.query.id);
    const tournamentFound = Tournaments.findById(tournamentIdParam);
    if(!tournamentFound){
        res.render('tournaments/error.hbs');
    }
    const coach = Coach.FindCoach(tournamentFound.creator);
    const nb_participants = Tournaments.nbParticipants(tournamentIdParam).nb_participants;
    
    
    if(req.session.user ){
      console.log("User connected");
      const today = new Date();
      today.setHours(0, 0, 0, 0); // set time to 00:00:00
      const tournamentDate = new Date(tournamentFound.date_tournament);
      tournamentDate.setHours(0, 0, 0, 0); // set time to 00:00:00

      if(tournamentDate > today){
        const inFuture = true;
        console.log("Tournament date"+tournamentDate>today);
        if(Tournaments.isRegistred(req.session.user.user_id,tournamentIdParam)){
          console.log("User already registred");
          res.render('tournaments/details.hbs', { tournament: tournamentFound ,coach: coach, nb_participants: nb_participants,isRegistered: true, isFull: false,inFuture: inFuture});

        }
        else {
          if(nb_participants < tournamentFound.nb_max_participants){
          console.log("User not registred");
          res.render('tournaments/details.hbs', { tournament: tournamentFound ,coach: coach, nb_participants: nb_participants,isRegistered: false, isFull: false,inFuture: inFuture});
          }
          else{
            console.log("Tournament full");
            res.render('tournaments/details.hbs', { tournament: tournamentFound ,coach: coach, nb_participants: nb_participants,isFull: true,inFuture: inFuture});
          }
        } 
    }
    }
    
    res.render('tournaments/details.hbs', { tournament: tournamentFound ,coach: coach, nb_participants: nb_participants,inFuture: false});

});

router.get('/create', (req, res) => {
  console.log("User status : " + req.session.user);
  if (req.session.user) {
    if (req.session.user.status !== 'coach') {
      res.redirect('/tournaments');
    } else {
      res.render('tournaments/creation.hbs', { errors: req.session.errors });
    }
  } else {
    res.redirect('/tournaments');
  }
  req.session.errors = null;
});


router.post('/create', upload.single('tournament_photo'), (req, res) => {
  console.log("Creating tournament");
  let errors = [];
  console.log(req.body);

  // Validate tournament name
  if (!req.body.name.trim()) {
    errors.push("Le nom du tournoi est obligatoire");
  } else {
    console.log(Tournaments.includesTournament(req.body.name));
    if (Tournaments.includesTournament(req.body.name)) {
      errors.push("Le tournoi avec ce nom existe déjà");
    }
  }

  // Validate tournament date
  if (!req.body.date.trim()) {
    errors.push("La date du tournoi est obligatoire");
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tournamentDate = new Date(req.body.date);
    tournamentDate.setHours(0, 0, 0, 0);

    if (tournamentDate < today) {
      errors.push("La date doit être supérieure à la date actuelle");
    }
  }

  // Validate maximum participants
  if (!req.body.max_participants.trim()) {
    errors.push("Le nombre de participants est obligatoire");
  } else {
    if (req.body.max_participants < 2) {
      errors.push("Le nombre de participants doit être supérieur à 1");
    }
  }

  // Validate file upload
  if (!req.file) {
    errors.push("Une photo est obligatoire");
  }

  // If no errors, proceed to create tournament
  if (errors.length == 0) {
    let filename = 'images/' + req.file.filename;
    console.log("Filename : " + filename);
    Tournaments.create(req.body.name, req.body.date, req.body.max_participants, req.session.user.user_id, filename);
    const id = Tournaments.findByName(req.body.name).tournament_id;
    res.redirect(`/tournaments`);
  } else {
    // If there are errors, store them in session and redirect back to create page
    req.session.errors = errors;
    res.redirect('/tournaments/create');
  }
});


router.post('/register', (req, res) => {
  const user= req.session.user;
  const tournamentId = req.body.id;
  console.log("Registering user "+user.user_id+" to tournament "+tournamentId);
  Tournaments.register(user.user_id,tournamentId);
  res.redirect('/tournaments/details?id='+tournamentId);
});


router.post('/unregister', (req, res) => {
  const user= req.session.user;
  const tournamentId = req.body.id;
  console.log("unregistering user "+user.user_id+" from tournament "+tournamentId);
  Tournaments.unregister(user.user_id,tournamentId);
  res.redirect('/tournaments/details?id='+tournamentId);
 
});
  module.exports = router;
  