const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');




const app = express();
var http = require("http").Server(app)
var io = require("socket.io")(http)

// Load Validation
 const validateChat2Input = require('../../validation/chat2');


// Load Chat Model
const Chat = require('../../models/Chat');


// @route   GET api/chat/test
// @desc    Tests chat route
// @access  Public

router.get('/test', (req, res) => res.json({ msg: 'Chat Works' }));




router.get('/start', (req, res) => {
    Chat.find({}, (error, chats) => {
        res.send(chats)
    })
})



io.on("connection", (socket) => {
    console.log("Socket is connected...")
})













// @route  POST api/chat/startmsg
// @desc   post chatMsg
// @access public
// user_id will be considered as app_id for testing

router.post('/startmsg', async (req, res) => {

  const { errors, isValid } = validateChat2Input(req.body);

  // Check Validation
  if(!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }


  // Search for user id and customeremail

    Chat.findOne({ $and: [ { customeremail: req.body.customeremail }, {user: req.body.user_id}]})
    .then(chat => {

      if(chat){
        // found
        // Start Chat

      const newMsg = {
           chatmsg : req.body.chatmsg,
           chatby : "0"
        }

    chat.chat_msg.unshift(newMsg);

    chat.save().then(chat => res.json(chat.chat_msg));

      }

      if(!chat){

          // create new chat account & then start chat
            const newChat = new Chat({
              user: req.body.user_id,
              customeremail: req.body.customeremail,
              clientname : req.body.clientname
          });






            newChat
            .save()
            .then(Chat => res.json(Chat.chat_msg))
            //Emit the event
          //  .io.emit("newChat", Chat)
            .catch(err => console.log(err));



      }




        })
          .catch(err => res.status(404).json({chat: 'There are no Client & Agent'}));
        });




module.exports = router;
