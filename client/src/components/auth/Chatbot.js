import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';
import chatIcon from '../icon/chat-icon.png';
import send from '../icon/send.png';

import leftarrow from '../icon/leftarrow.png';
import cancel from '../icon/cancel.png';
import { Link } from 'react-router-dom';


class Chatbot extends Component {



  constructor(props){
    super(props);

    this.state = {
      customeremail: '',
      clientname: '',
      chatmsg:'',
      errors:{},
      chattt:[],
      user_id:'',
      data:[],
      flag:0,
      show:true,
      hidden:true
    };
    this.toggleDiv = this.toggleDiv.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  toggleDiv = () => {
    const { show } = this.state;
    this.setState({ show : !show})
  }



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }







  onSubmit(e){
    e.preventDefault();

      const newMsg = {
        user_id: this.props.match.params.handle, // User Id will be considered as app_id


        customeremail: this.state.customeremail,
        clientname: this.state.clientname,
        chatmsg: this.state.chatmsg


      };

      axios
      .post('/api/chat/startmsg', newMsg)
      .then(res => {
          this.setState({chattt: res.data, chatmsg:'', hidden:false, flag: 1})

      })

      .catch(err => this.setState({errors: err.response.data}));


  }




  componentDidUpdate() {
            const newMsg = {
              user_id: this.props.match.params.handle, // User Id will be considered as app_id
              customeremail: this.state.customeremail
            };

      if((this.state.flag) === 1){
            axios
            .post('/api/chat/fetchmsg', newMsg)
            .then(res => {
                this.setState({chattt: res.data, hidden:false})
            })
            //.then(res => console.log(res.data))
          //  .catch(err => console.log({errors: err.response.data}));
            .catch(err => this.setState({errors: err.response.data}));

          }
  }



// Warning: Can't call setState (or forceUpdate) on an unmounted component.
// This is a no-op, but it indicates a memory leak in your application.
// To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
  //  in Chatbot (created by Route)

  componentWillUnmount(){
    this.setState = {
      customeremail: '',
      clientname: '',
      chatmsg:'',
      errors:{},
      chattt:[],
      user_id:'',
      data:[],
      flag:0,
      show:true,
      hidden:true
    };
  }


  render(){

  //  const { data } = this.state;
    const { errors } = this.state;
    return(

      <div>
      <div className="cc">
      <img src={chatIcon} alt="chatIcon" className="show_hide" id="cc" height="50px" onClick={ this.toggleDiv}/>
      </div>



  { this.state.show &&
      <div className="slidingDiv">

      <div className="mainHeading">

      <div className="arroww">
      <span><Link className="pp11" to={'/chatapp/'+this.props.match.params.handle } ><img src={leftarrow} alt="leftarrow" className="leftarrow" height="17px"/></Link></span>
      <span><img src={cancel} alt="cancel" className="cancel" height="12px" onClick={ this.toggleDiv}/></span>
      </div>

        <b><p className="headd">Prackr Chat</p></b>
      </div>


      <div className="mainAreaChat">



              {this.state.chattt.map(function(message, i) {
                return message.chatby === "1" ? (

                  <div className="incoming_msg" key={i}>
                    <div className="received_msg">
                    <div className="received_withd_msg">
                      <p>
                        <b>{"Agent"}</b> <br/>{message.chatmsg}
                      </p>
                      <span className="time_date"> {message.date}</span>{" "}
                    </div>
                      </div>
                  </div>
                ) : (
                  <div className="outgoing_msg" key={i}>
                    <div className="sent_msg">

                        <p>
                        {message.chatmsg}
                        </p>
                        <span className="time_date">{message.date}</span>
                      </div>

                  </div>
                );
              })}


      </div>





        <form className="inputPanel" noValidate onSubmit={this.onSubmit}>


        { this.state.hidden &&
          <div className="form-group1">

            <input type="email"
            className={classnames('form-control', 'btn-sm',{
              'is-invalid' : errors.customeremail
            })}
            autoComplete="off"
            id="customeremail"
            placeholder="example@domain.com"
            name="customeremail"
            value={this.state.customeremail}
            onChange={this.onChange}
            />


            {errors.customeremail && (<div className="invalid-feedback">{errors.customeremail}</div>)}
        </div>
      }


      { this.state.hidden &&
          <div className="form-group1">

            <input type="text"
            className={classnames('form-control', 'btn-sm',{
              'is-invalid' : errors.clientname
            })}
            autoComplete="off"
            id="clientname"
            placeholder="Type your name"
            name="clientname"
            value={this.state.clientname}
            onChange={this.onChange} />
            {errors.clientname && (<div className="invalid-feedback">{errors.clientname}</div>)}
          </div>


        }


        <div className="btn-group">
          <div className="form-group1">

          <input type="text"
          className={classnames('form-control', 'btn-md', 'rcw-new-message2', 'btfont',{
            'is-invalid' : errors.chatmsg
          })}

          autoComplete="off"
          id="chatmsg"
          name="chatmsg"
          placeholder="Send a message..."
          value={this.state.chatmsg}
          onChange={this.onChange}

          />
          {errors.chatmsg && (<div className="invalid-feedback">{errors.chatmsg}</div>)}

          </div>


        <button type="submit" disabled={!(this.state.chatmsg && this.state.clientname && this.state.customeremail)} className="rcw-send2"><img src={send} alt="send" className="chat-icon" height="25px"/></button>



</div>
        </form>


          <div className="Powered">
            <p>Powered by <b>Prackr</b></p>
          </div>


            </div>
}
      </div>

    );
  }
}




export default Chatbot;
