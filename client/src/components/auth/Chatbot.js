import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';
import chatIcon from '../icon/chat-icon.png';
import send from '../icon/send.png';


class Chatbot extends Component {



  constructor(props){
    super(props);

    this.state = {
      show:true,
      app_id: ''
    };
    this.toggleDiv = this.toggleDiv.bind(this)
  }
  toggleDiv = () => {
    const { show } = this.state;
    this.setState({ show : !show})
  }


  render(){
    var app_id = '5b5454d7079bad399cbe72ba';
    return(

      <div className="cc">
      <img src={chatIcon} alt="chatIcon" className="show_hide" id="cc" height="50px" onClick={ this.toggleDiv}/>
      { this.state.show && <Box app_id={app_id}/> }
      </div>

    );
  }
}



  class Box  extends Component {
      constructor(props){
        super(props);

        this.state = {
          customeremail: '',
          clientname: '',
          chatmsg:'',
          errors:{},
          chattt:[],
          user_id:'',
          flag:0,
          show:true
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

      }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }







      onSubmit(e){
        e.preventDefault();

          const newMsg = {
            user_id: this.props.app_id,
          //  user_id:"5b5454d7079bad399cbe72ba", // User Id will be considered as app_id for initial testing
            customeremail: this.state.customeremail,
            clientname: this.state.clientname,
            chatmsg: this.state.chatmsg


          };
          //console.log(newMsg);
          axios
          .post('/api/chat/startmsg', newMsg)
          .then(res => {
              this.setState({chattt: res.data, chatmsg:'', show:false, flag: 1})

          })
          //.then(res => console.log(res.data))

          //.catch(err => console.log({errors: err.response.data}));
          .catch(err => this.setState({errors: err.response.data}));


      }




      componentDidUpdate() {
                const newMsg = {
                  user_id: this.props.app_id,
                //  user_id:"5b5454d7079bad399cbe72ba", // User Id will be considered as app_id for initial testing
                  customeremail: this.state.customeremail
                //  clientname: this.state.clientname,
                //  chatmsg: this.state.chatmsg
                };
                //console.log(newMsg);
          if((this.state.flag) === 1){
                axios
                .post('/api/chat/fetchmsg', newMsg)
                .then(res => {
                    this.setState({chattt: res.data, show:false})
                })
                //.then(res => console.log(res.data))
                //.catch(err => console.log({errors: err.response.data}));
                .catch(err => this.setState({errors: err.response.data}));

              }
      }








    render(){
      const { errors } = this.state;


      return(


        <div className="slidingDiv">

        <div className="mainHeading">
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


          { this.state.show &&
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


        { this.state.show &&
            <div className="form-group1">

              <input type="text"
              className={classnames('form-control', 'btn-sm',{
                'is-invalid' : errors.clientname
              })}
              autoComplete="off"
              id="clientname"
              placeholder="Enter Your Name"
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




          <button type="submit" className="rcw-send2"><img src={send} alt="send" className="chat-icon" height="25px"/></button>



</div>
          </form>










            <div className="Powered">
              <p>Powered by <b>Prackr</b></p>
            </div>


              </div>

      );
    }
  }










export default Chatbot;
