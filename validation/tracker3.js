const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTracker3Input(data) {
  let errors = {};


  data.customeremail = !isEmpty(data.customeremail) ? data.customeremail : '';
  data.requestid = !isEmpty(data.requestid) ? data.requestid : '';




  if (Validator.isEmpty(data.customeremail)) {
    errors.customeremail = 'Email field is required';
  }

  if (!Validator.isEmail(data.customeremail)) {
    errors.customeremail = 'Email is invalid';
  }


  if (Validator.isEmpty(data.requestid)) {
    errors.requestid = 'Ticket No. is required';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
