const mongoose = require('mongoose');
var randomstring = require("randomstring");
const Schema = mongoose.Schema;


// Create Schema
const UserShema = new Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required:true
  },
  avatar:{
    type: String
  },


  app_id:{
    type: String,
        default: function() {
            return randomstring.generate(7);
        }
  },


  date:{
    type: Date,
    default:Date.now
  }
});


module.exports = User = mongoose.model('users', UserShema);
