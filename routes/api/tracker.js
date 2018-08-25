const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


// Load Validation
const validateProfileInput = require('../../validation/faq');
const validateTrackerInput = require('../../validation/tracker');
const validateTracker2Input = require('../../validation/tracker2');
const validateTracker3Input = require('../../validation/tracker3');

// Load Profile Model
const Profile = require('../../models/Faq');

// Load User Model
const User = require('../../models/User');

// Load Tracker model
const Tracker = require('../../models/Tracker');

// @route   GET api/tracker/test
// @desc    Tests tracker route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: 'Tracker Works' }));





/* client side issue post */




// @route  POST api/tracker
// @desc   Create Ticket
// @access public
// user_id will be considered as app_id for testing

router.post('/clientissue', (req, res) => {

  const { errors, isValid } = validateTrackerInput(req.body);

  // Check Validation
  if(!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

// Search for user id and request id
  Tracker.findOne({user: req.body.user_id})
  .then(tracker => {


    if(tracker){


      const newTracker = new Tracker({
      user: req.body.user_id,
      customeremail : req.body.customeremail,
      clientname : req.body.clientname,
      clientquery : req.body.clientquery,
      status_date : {
      status: "Ticket Open"
   }
 });



 newTracker
 .save()
 .then(Tracker => res.json(Tracker))
 .catch(err => console.log(err));


}
})
});









/* end client side post */




// @route  POST api/tracker
// @desc   Create Ticket
// @access private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  const { errors, isValid } = validateTrackerInput(req.body);

  // Check Validation
  if(!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

// Search for user id and request id
  Tracker.findOne({ $and: [ { requestid: req.body.requestid }, {user: req.user.id}]})
  .then(tracker => {

    if(tracker){
      errors.requestid = 'Ticket ID Not Found!';
      res.status(400).json(errors);
    }

    if(!tracker){


   const newTracker = new Tracker({
   user: req.user.id,
   customeremail : req.body.customeremail,
   clientname : req.body.clientname,
   clientquery : req.body.clientquery,
   status_date : {
     status: "Ticket Open"
   }
 });



 newTracker.save().then(Tracker => res.json(Tracker));


}
})
});









// @route  POST api/tracker/updatestatus
// @desc   Update status to tracker
// @access private

router.post('/updatestatus', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validateTracker2Input(req.body);

  // Check Validation
  if(!isValid){
    // Return any errors with 400 Status
    return res.status(400).json(errors);
  }

// Search for user id and request id
  Tracker.findOne({ $and: [ { requestid: req.body.requestid }, {user: req.user.id}]})
  .then(tracker => {


    if(!tracker){
      errors.requestid = 'Ticket ID Not Found!';
      res.status(400).json(errors);
    }

    if(tracker){

    const newStatus = {
        status: req.body.status
    }


    // Add to exp array
    tracker.status_date.unshift(newStatus);
    tracker.save().then(tracker => res.json(tracker));

}

  })
});










// @route  POST api/tracker/checkstatus
// @desc   Check Ticket status
// @access public

router.post('/checkstatus', (req, res) => {
  const { errors, isValid } = validateTracker3Input(req.body);

  // Check Validation
  if(!isValid){
    // Return any errors with 400 Status
    return res.status(400).json(errors);
  }


  // Search for email id and request id
  Tracker.findOne({ $and: [ { requestid: req.body.requestid }, {customeremail: req.body.customeremail}]})




    .then(tracker => {
      if(!tracker){
        errors.notracker = 'Ticket not Found!';
        res.status(404).json(errors);  // Not found error 404

      }

      if(tracker){
        //res.json(tracker.status_date);  // found 200
          res.json(tracker);  // found 200
      }
    })
    .catch(err => res.status(404).json({notracker: 'Ticket not Found!'}));
});






module.exports = router;
