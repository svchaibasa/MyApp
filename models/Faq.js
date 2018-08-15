const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FaqSchema = new Schema({
  user: {
    type:Schema.Types.ObjectId,
    ref: 'users'
  },


  faq_qa: [
    {
        qns:{
          type: String,
          required: true
      },
      ans:{
          type: String,
          required: true
      }

  }
],



date: {
  type: Date,
  default: Date.now
}

});

module.exports = Faq = mongoose.model('faq', FaqSchema);
