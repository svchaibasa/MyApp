const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


const users = require('./routes/api/users');
const faq = require('./routes/api/faq');
const tracker = require('./routes/api/tracker');
const chat = require('./routes/api/chat');
const adminchat = require('./routes/api/adminchat');



const app = express();
// var http = require("http").Server(app)
// var io = require("socket.io")(http)

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
.connect(db)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));




// app.get('/', (req, res) => res.send('Hello World!'));







// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);




// User Routes
app.use('/api/users', users);
app.use('/api/faq', faq);
app.use('/api/tracker', tracker);
app.use('/api/chat', chat);
app.use('/api/adminchat', adminchat);


// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


//
// io.on("connection", (socket) => {
//     console.log("Socket is connected...")
// })

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
