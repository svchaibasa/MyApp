const Validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validateChatInput(data) {
  let errors = {};

  data.customeremail = !isEmpty(data.customeremail) ? data.customeremail : '';
  data.chatmsg = !isEmpty(data.chatmsg) ? data.chatmsg : '';

  if (Validator.isEmpty(data.chatmsg)) {
    errors.chatmsg = 'Type a message';
  }

  if (Validator.isEmpty(data.customeremail)) {
    errors.customeremail = 'Email field is required';
  }

  if (!Validator.isEmail(data.customeremail)) {
    errors.customeremail = 'Email is invalid';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
