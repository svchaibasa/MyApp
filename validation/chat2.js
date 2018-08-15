const Validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = function validateChat2Input(data) {
  let errors = {};

  data.customeremail = !isEmpty(data.customeremail) ? data.customeremail : '';
  data.clientname = !isEmpty(data.clientname) ? data.clientname : '';
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

  if (Validator.isEmpty(data.clientname)) {
    errors.clientname = 'Client Name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
