if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}







//
// module.exports = {
//   mongoURI:'mongodb://localhost:27017/PrackrApp',
// //  mongoURI: 'mongodb://sumit:sumit123@ds123012.mlab.com:23012/prackrapp',
//   secretOrKey: 'secret'
// };
