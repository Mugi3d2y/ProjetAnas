const express = require('express');
const router = express.Router();
const Court = require('../models/Court.js');
const Tournament = require('../models/Tournament.js')
const Messages = require('../models/Messages.js');
const Coach = require('../models/Coach.js');



router.get('/', (req, res) => {
    const nbMessages = Messages.numberMessages().nbMessages;
    const nbTournaments = Tournament.numberTournaments().nbTournois;
    const nbBookings = Court.numberBookings().nbBookings;
    const i = 'coach';
    const coaches = Coach.list(i);
    res.render('index.hbs',{nbMessages:nbMessages, nbTournaments : nbTournaments, nbBookings : nbBookings, coaches});
});



module.exports = router;