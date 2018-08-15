const mongoose = require('mongoose');
var randomstring = require("randomstring");
const Schema = mongoose.Schema;

// Create Schema
const TrackerSchema = new Schema({
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
  clientquery:{
    type: String,
    required : true
  },

  requestid:{
    type: String,
        default: function() {
            return randomstring.generate(10);
        }
  },


  status_date: [
    {
        status:{
          type: String,
          required: true
      },

      date: {
        type: Date,
        default: Date.now
      }

  }
]

});



module.exports = Tracker = mongoose.model('tracker', TrackerSchema);
