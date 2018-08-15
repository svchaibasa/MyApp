const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTrackerInput(data) {
  let errors = {};


  data.customeremail = !isEmpty(data.customeremail) ? data.customeremail : '';
  data.clientname = !isEmpty(data.clientname) ? data.clientname : '';
  data.clientquery = !isEmpty(data.clientquery) ? data.clientquery : '';



  if (Validator.isEmpty(data.customeremail)) {
    errors.customeremail = 'Email field is required';
  }

  if (!Validator.isEmail(data.customeremail)) {
    errors.customeremail = 'Email is invalid';
  }


  if (Validator.isEmpty(data.clientname)) {
    errors.clientname = 'Client Name is required';
  }


    if (Validator.isEmpty(data.clientquery)) {
      errors.clientquery = 'Client Query is required';
    }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
