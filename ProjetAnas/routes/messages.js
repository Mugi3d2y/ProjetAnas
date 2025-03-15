const express = require('express');
const router = express.Router();
const Messages = require('../models/Messages.js');
const Coach = require('../models/Coach.js');



router.get('/messages',(req, res) => {
    let messages = null;
    if(req.session.user===undefined){
        res.redirect('/coaches/list')
    }
    if(req.session.user.status === "coach"){
        messages = Messages.listCoach(req.session.user.user_id);
    } else {
        messages = Messages.listUser(req.session.user.user_id);
    }
    const i = parseInt(req.session.user.user_id);
    const coach = Coach.FindCoach(i);
    res.render('coaches/messages.hbs', {coach,messages});
});

router.post('/answer', (req, res) => {
    const id = parseInt(req.body.msg_id);
    Messages.answer(id,req.body.message);
    res.redirect('/coaches/messages')
});

module.exports = router;