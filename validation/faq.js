const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFaqInput(data) {
  let errors = {};


  data.qns = !isEmpty(data.qns) ? data.qns : '';
  data.ans = !isEmpty(data.ans) ? data.ans : '';


if(Validator.isEmpty(data.qns)){
  errors.qns = 'Faq Question is required';
}


if(Validator.isEmpty(data.ans)){
  errors.ans = 'Faq Answer is required';
}




  return {
    errors,
    isValid: isEmpty(errors)
  };
};
