import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';


import Chat from './components/layout/Chat';
import Chatbot from './components/auth/Chatbot';
import Issue from './components/auth/Issue';
import Track from './components/auth/Track';
import Faq from './components/auth/Faq';


import AdminDashboard from './components/auth/AdminDashboard';






import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';





import './App.css';
import './style/newCSS.css';





// Check for Token
if(localStorage.jwtToken){
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired Token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current profile

    // Redirect to login
    window.location.href = '/landing/login';
  }
}



class App extends Component {
  render() {
    return (
      <Provider store= { store }>
      <Router>
      <div className="App">


        <Route exact path="/" component={ Chat }/>


            <Route exact path="/Chatbot" component={Chatbot}/>
            <Route exact path="/Issue" component={Issue}/>
            <Route exact path="/Track" component={Track}/>
            <Route exact path="/Faq" component={Faq}/>









            <Route exact path="/Landing" component={Navbar}/>
            <Route exact path="/Landing" component={ Landing }/>
            <Route exact path="/Landing" component={Footer}/>


          <div className="container">
            <Route exact path="/Landing/Register" component={Register}/>
            <Route exact path="/Landing/Login" component={Login}/>
            <Route exact path="/Landing/AdminDashboard" component={AdminDashboard}/>
          </div>


      </div>
      </Router>
        </Provider>
    );
  }
}

export default App;
