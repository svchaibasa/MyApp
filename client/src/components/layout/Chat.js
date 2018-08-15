import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import chatIcon from '../icon/chat-icon.png';
import mascot from '../icon/mascot.png';

class Chat extends Component {

  constructor(props){
    super(props);

    this.state = { show:false};
    this.toggleDiv = this.toggleDiv.bind(this)
  }
  toggleDiv = () => {
    const { show } = this.state;
    this.setState({ show : !show})
  }


  render(){
    return(

      <div className="cc">
      <img src={chatIcon} alt="chatIcon" className="show_hide" id="cc" height="50px" onClick={ this.toggleDiv}/>
      { this.state.show && <Box /> }
      </div>

    );
  }
}


class Box extends Component {
  render(){
    return(
      <div className="slidingDiv">

      <div className="mainContent">
        <img src={mascot} alt="mascot" className="chat-icon" height="120px"/>


        <div className="zz1">
          <b><p>&nbsp; Hello, <br/>I am BIZ Bot, how can i <br/>help you today?</p></b>
        </div>




  <div className="mainArea3">
        <div className="zz33">
          <span><img src={require('../icon/icon1.png')} alt="" className="icon11" height="35px"/><b><Link className="pp11" to="/chatbot">Talk to our Experts</Link></b></span>
        </div>

       <div className="zz33">
        <span><img src={require('../icon/icon3.png')}  alt="" className="icon22" height="23px"/></span><b><Link className="pp22" to="/issue">Post your Inquiry / Issue</Link></b>
       </div>

      <div className="zz33">
        <span><img src={require('../icon/icon2.png')}  alt="" className="icon22" height="23px"/></span><b><Link className="pp33" to="/track">Track My Tickets</Link></b>
       </div>

       <div className="zz33">
         <span><img src={require('../icon/icon4.png')}  alt="" className="icon22" height="23px"/></span><b><Link className="pp44" to="/faq">Frequently Asked Questions</Link></b>
       </div>

</div>



       <div className="Powered">
         <p>Powered by <b>Prackr</b></p>
       </div>



       </div>
    </div>
    );
  }
}


export default Chat;
