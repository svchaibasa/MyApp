const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateTracker2Input(data) {
  let errors = {};


  data.requestid = !isEmpty(data.requestid) ? data.requestid : '';
  data.status = !isEmpty(data.status) ? data.status : '';



  if (Validator.isEmpty(data.requestid)) {
    errors.requestid = 'Ticket No. is required';
  }


  if (Validator.isEmpty(data.status)) {
    errors.status = 'Ticket Status is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
