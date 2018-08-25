import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import chatIcon from '../icon/chat-icon.png';
import mascot from '../icon/mascot.png';

import icon1 from '../icon/icon1.png';
import icon2 from '../icon/icon2.png';
import icon3 from '../icon/icon3.png';
import icon4 from '../icon/icon4.png';
import cancel from '../icon/cancel.png';

class Chat extends Component {

  constructor(props){
    super(props);

    this.state = {
      show:true
    };
    this.toggleDiv = this.toggleDiv.bind(this)
  }
  toggleDiv = () => {
    const { show } = this.state;
    this.setState({ show : !show})
  }

  componentDidMount () {
  //  const { handle } = this.props.match.params;
  //  console.log(handle);


  }

  render(){
      //const { handle } = this.props.match.params;
    return(
      <div>
      <div className="cc">
      <img src={chatIcon} alt="chatIcon" className="show_hide" id="cc" height="50px" onClick={ this.toggleDiv}/>

      </div>




      { this.state.show &&

        <div className="slidingDiv">

        <div className="mainContent">

        <div className="arroww">
        <span><img src={cancel} alt="cancel" className="cancel" height="12px" onClick={ this.toggleDiv}/></span>
        </div>


          <img src={mascot} alt="mascot" className="chat-icon" height="120px"/>


          <div className="zz1">
            <b><p>&nbsp; Hello, <br/>I am BIZ Bot, how can i <br/>help you today?</p></b>
          </div>




    <div className="mainArea3">
          <div className="zz33">
            <span><img src={icon1} alt="icon1" className="icon11" height="35px"/><b><Link className="pp11" to={'/chatapp/chatbot/'+this.props.match.params.handle }>Talk to our Experts</Link></b></span>
          </div>

         <div className="zz33">
          <span><img src={icon3} alt="icon3" className="icon22" height="23px"/></span><b><Link className="pp22" to={'/chatapp/issue/'+this.props.match.params.handle }>Post your Inquiry / Issue</Link></b>
         </div>

        <div className="zz33">
          <span><img src={icon2} alt="icon2" className="icon22" height="23px"/></span><b><Link className="pp33" to={'/chatapp/track/'+this.props.match.params.handle }>Track My Tickets</Link></b>
         </div>

         <div className="zz33">
           <span><img src={icon4} alt="icon4" className="icon22" height="23px"/></span><b><Link className="pp44" to={'/chatapp/faq/'+this.props.match.params.handle }>Frequently Asked Questions</Link></b>
         </div>

  </div>



         <div className="Powered">
           <p>Powered by <b>Prackr</b></p>
         </div>



         </div>

      </div>


      }



      </div>
    );
  }
}


export default Chat;
