const express = require('express');
const router = express.Router();
const Court = require('../models/Court.js');
const Coach = require('../models/Coach.js');
const { name } = require('../models/db_conf.js');
const courtListe = Court.list();
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


/*GET COURTS LISTE PAGE*/
router.get('/', function (req, res, next) {
    const courtListe = Court.list();
    console.log(courtListe);
    res.render('courts/liste.hbs', { courtListe });
});


/* GET details court. */
router.get('/details', function (req, res, next) {
    console.log("GET DETAILS COURT");
    const id = parseInt(req.query.id);
    const coach = Coach.FindCoach(id);
    const maxDate = new Date(today);
      
    //get date 
    var today=new Date();
    var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var formattedDate = year + '-' + month + '-' + day;


   console.log("id"+id);
   const courtFound=Court.findById(id);
   console.log("param"+courtFound);
   
   

    res.render('courts/details.hbs', {court:courtFound,formattedDate,coach});

});
/*  GET BOOKING*/
router.get('/booking', function (req, res, next) {
    const user_id=req.session.user.user_id;
    const bookingList=Court.list_booking (user_id);
    res.render('courts/booking.hbs',{bookingList});

});
/* GET BOOKING_LISTE PAGE*/
router.post('/booking', function (req, res, next) {
    const dateBooking=req.body.date;
    const idCourt=req.body.id;
    const court = Court.findById(idCourt);
        bookingsTable = Court.search(dateBooking,idCourt);
     if(bookingsTable) {
        res.render('courts/details.hbs',{court:court ,error:true});
  
    } else{
        const user_id=req.session.user.user_id; 
        console.log("id user"+user_id);
        const data={
            date_booking: req.body.date,
            tennis_court_id: req.body.id,
            user_id: req.session.user.user_id
        }
        console.log('voici ma resa:'+JSON.stringify(data))
        Court.save(data);

        const bookingList=Court.list_booking (user_id);
        console.log("id terrain"+bookingList.tennis_court_id);
       
    

      res.render('courts/booking.hbs',{bookingList});
        
}});
/*UNBOOK */
router.post('/unbook', function (req, res, next) {
    const user_id=req.session.user.user_id;
    const bookingList=Court.list_booking (user_id);
    const data={
        date_booking: req.body.date,
        tennis_court_id: req.body.id,
        user_id: req.session.user.user_id
    }
    Court.delete(data);
    
    res.redirect('/courts/booking');

});

/*get Update page */
router.get('/update', function (req, res, next) {
    const court = Court.findById(req.query.tennis_court_id);
    console.log("POST UPDATE Court");

    res.render('courts/update.hbs',{court: court});
});

router.post('/update', upload.single('court_picture'),function (req, res, next) {
    console.log("POST UPDATE COURT");
    if(req.body.court_name==""){
        req.body.court_name=null;
    }
    if(req.body.location==""){
        req.body.location=null;
    }
    let filename = null;
    if(req.file){
        let filename = 'images/' + req.file.filename;
        console.log("Filename : "+filename);
    }
    const tennis_court_id = req.body.tennis_court_id;  
    if (tennis_court_id) {
        Court.editCourt({
            id: tennis_court_id,
            name: req.body.court_name,
            flooring_type: req.body.flooring_type,
            location: req.body.location, 
            picture_path:filename
        });

       
       res.redirect(`/courts/details?id=${tennis_court_id}`);
    } else {
      
        res.render('courts/update.hbs', { error: 'Court ID is required.' });
    }
       

});
module.exports = router;





