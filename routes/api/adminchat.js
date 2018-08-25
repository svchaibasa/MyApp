const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');





// Load Validation
  const validateChatInput = require('../../validation/chat');



// Load Chat Model
const Chat = require('../../models/Chat');


// @route   GET api/adminchat/test
// @desc    Tests chat route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: 'Admin Chat Works' }));






// @route  POST api/adminchat/reply
// @desc   post replay by admin
// @access private

router.post('/reply', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validateChatInput(req.body);

  // Check Validation
  if(!isValid){
    // Return any errors with 400 Status
    return res.status(400).json(errors);
  }

// Search for user id and customeremail
  Chat.findOne({ $and: [ { customeremail: req.body.customeremail }, {user: req.user.id}]})
  .then(chat => {

    if(chat){

      // Chat reply
    const newReply = {
         chatmsg : req.body.chatmsg,
         chatby : "1"
  }

  chat.chat_msg.unshift(newReply);

  chat.save().then(chat => res.json(chat.chat_msg));

    }

      })
        .catch(err => res.status(404).json({chat: 'There are no Client & admin'}));
      });











      // @route  GET api/adminchat/chatlist
      // @desc   get all the chat client list
      // @access private

      router.get('/chatlist', passport.authenticate('jwt', {session: false}), (req, res) => {
      // Search for user id and user id
        Chat.find({user: req.user.id})

        .then(chat => {
            if(!chat){
              errors.nochat = 'There are no Client found';
              res.status(404).json(errors);  // Not found error 404
            }

            if(chat){

              res.json(chat);  // found 200


            }
          })
          .catch(err => res.status(404).json({chat: 'There are no Client found'}));
            });



























            /// @route  POST api/adminchat/getclient
            // @desc   get get client chat
            // @access private

            router.post('/getclient', passport.authenticate('jwt', {session: false}), (req, res) => {

              // Search for user id and customeremail

                Chat.findOne({ $and: [ { customeremail: req.body.customeremail }, {user: req.user.id}]})
                .then(chat => {

                  if(chat){
                    res.json(chat.chat_msg);
                  }

                  if(!chat){
                      errors.customeremail = 'Admin id & customeremail ID Not Found!';
                    }
                    })
                      .catch(err => res.status(404).json({chat: 'There are no Client & admin'}));
                    });



module.exports = router;
