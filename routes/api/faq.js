const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateFaqInput = require('../../validation/faq');

// Load Profile Model
const Faq = require('../../models/Faq');

// Load User Model
const User = require('../../models/User');

// @route  GET api/profile/test
// @desc   Test profile route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'FAQ Works' }));










// @route  GET api/faq/all
// @desc   Get all faq
// @access public
router.get('/all', (req, res) => {
  const errors = {};

  Faq.find()
  .populate('user', ['name', 'avatar'])
  .then(faqs => {
    if(!faqs) {
      errors.nofaq = 'There is no Faq';
      return res.status(404).json(errors);
    }

    res.json(faqs);
  })
  .catch(err => res.status(404).json({faq: 'There are no Faqs'}));
});





// @route  GET api/faq
// @desc   Get current users faq
// @access private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  Faq.findOne({ user: req.user.id })
  .populate('user', ['name', 'avatar'])
  .then(faq => {
    if(!faq) {
      errors.nofaq = 'There is no Faq for this User';
      return res.status(404).json(errors);
    }
    res.json(faq);
  })
  .catch(err => res.status(404). json(err));
});







// @route  POST api/faq
// @desc   Create users or Add  faq
// @access private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  const { errors, isValid } = validateFaqInput(req.body);

  // Check Validation
  if(!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

// Search for user id
  Faq.findOne({ user: req.user.id})
  .then(faq => {

    if(faq){

      const newFaq = {
           qns: req.body.qns,
           ans: req.body.ans
    }
    faq.faq_qa.unshift(newFaq);

    faq.save().then(faq => res.json(faq));

    } else {
      // Create New Faq
   const newFaq = new Faq({
     user: req.user.id,
     faq_qa : {
        qns: req.body.qns,
        ans: req.body.ans
    }
 });

 newFaq.save().then(Faq => res.json(Faq));
}
})
  .catch(err => res.status(404).json({faq: 'There are no Faqs'}));
});






// @route  POST api/faq/faqq
// @desc   GET faq by user ID
// @access public
// user_id will be considered as app_id for testing

router.post('/faqq', (req, res) => {
  const errors = {};

  Faq.findOne({ user: req.body.user_id })

    .then(faq => {
      if(!faq){
        errors.nofaq = 'There are no FAQ found';
        res.status(404).json(errors);  // Not found error 404
      }

      if(faq){
        res.json(faq.faq_qa);  // found 200
      }
    })
    .catch(err => res.status(404).json({faq: 'There are no FAQ found'}));
});









// @route  DELETE api/faq/:faq_id
// @desc   delete One qns & ans from faq
// @access private

router.delete('/:faq_id', passport.authenticate('jwt', {session: false}), (req, res) => {


  Faq.findOne({ user: req.user.id })
  .then(faq => {

    // Get remove index
    const removeIndex = faq.faq_qa
    .map(item => item.id)
    .indexOf(req.params.faq_id);

    // Splice out of array
    faq.faq_qa.splice(removeIndex, 1);

    // save
    faq.save().then(faq => res.json(faq));
  })
  .catch(err => res.status(404).json(err));
});








module.exports = router;
