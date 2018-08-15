const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const ChatShema = new Schema({
  user: {
    type:Schema.Types.ObjectId,
    ref: 'users'
  },
  customeremail:{
    type: String,
    required : true
  },
  clientname:{
    type: String,
    required : true
  },

  chat_msg: [
    {
        chatmsg:{
          type: String,
          required: true
      },
        chatby:{
          type: String
      },

      date: {
        type: Date,
        default: Date.now
      }

  }
],


date: {
  type: Date,
  default: Date.now
}

});


module.exports = Chat = mongoose.model('chats', ChatShema);
