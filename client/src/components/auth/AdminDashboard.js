import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';
import user from '../icon/user.png';
import send from '../icon/send.png';

// import script1 from '../icon/Untitled.png';
// import script2 from '../icon/Untitled2.png';

import Navbar from '../../components/layout/Navbar';


class AdminDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors:{},
      clist:[],
      cchat:[],
      data:[],
      flag:0,
      customeremail: '',
      chatmsg:'',
      show:false
    };

    // This binding is necessary to make `this` work in the callback
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  handleClick(param, e) {
    // console.log("Parameter", param);
    // console.log("Event", e);
    this.setState({ customeremail: param, flag:1, show:true});
  }



componentDidMount() {
      axios
      .get('/api/adminchat/chatlist')
      .then(res => {
        this.setState({ clist: res.data})
      })
      .catch(err => this.setState({errors: err.response.data}));









}


  //
  // componentWillMount() {
  //
  //         const getChat = {
  //           customeremail: this.state.customeremail
  //           //customeremail: "svchaibasa@gmail.comm"
  //         };
  //         //console.log(getChat);
  //         axios
  //         .post('/api/adminchat/getclient', getChat)
  //
  //         .then(res => {
  //             this.setState({cchat: res.data})
  //         })
  //         .catch(err => this.setState({errors: err.response.data}));
  //
  //     }





          onSubmit(e){
            e.preventDefault();

              const newReply = {
              //  user_id:"5b5454d7079bad399cbe72ba", // User Id will be considered as app_id for initial testing
              //  customeremail: "svchaibasa@gmail.com",
                customeremail: this.state.customeremail,
              //  clientname: "Sumit Vishwakarma",
                chatmsg: this.state.chatmsg

              };
              //console.log(newReply);
              axios

              .post('/api/adminchat/reply', newReply)

              .then(res => {
                  this.setState({chatmm: res.data})
              })
              .catch(err => this.setState({errors: err.response.data}));

            //  .then(res => console.log(res.data))
            //  .catch(err => console.log({errors: err.response.data}));

              this.setState({
                chatmsg:''
              });


          }



          componentDidUpdate() {

                  const getChat = {
                    customeremail: this.state.customeremail
                    //customeremail: "svchaibasa@gmail.comm"
                  };
                  //console.log(getChat);
          //    if(!(this.state.customeremail) === ''){
                  if((this.state.flag) === 1){
                  axios
                  .post('/api/adminchat/getclient', getChat)

                  .then(res => {
                      this.setState({cchat: res.data})
                  })
                  .catch(err => this.setState({errors: err.response.data}));

              }




/* list update test */

              axios
              .get('/api/adminchat/chatlist')
              .then(res => {
                this.setState({ clist: res.data})
              })
              .catch(err => this.setState({errors: err.response.data}));
/* end list update test */

            }


            onLogoutClick(e) {
                e.preventDefault();
                this.props.logoutUser();
            }


  render(){
    const { errors } = this.state;
    //const data = (this.state || {}).data





    return(
      <div>
      <Navbar/>

          <div className="container-fluid">
            <div className="row">
              <div className="rowHead">
              </div>

              <div className="col-sm-4">











              <div className="chatList">
                {this.state.clist.map((item, i) => {
                  return (
                    <div key={i}>
                      <div
                        className="chatflow"
                        onClick={this.handleClick.bind(
                          this,
                          item.customeremail
                        )}
                      >
                      <img src={user} alt="user" className="usericon" height="30px"/>

                      <div className="namebind">
                        <div className="clientname">{item.clientname}</div>
                        <p className="customeremail">{item.customeremail}</p>
                      </div>

                      </div>

                    </div>
                  );
                })}
              </div>








              </div>
                { this.state.show &&
              <div className="col-sm-5">





              <div className="mainAreaChat">


                      {this.state.cchat.map(function(message, i) {
                        return message.chatby === "0" ? (

                          <div className="incoming_msg" key={i}>
                            <div className="received_msg">
                            <div className="received_withd_msg">
                              <p>
                              <b>{"Client"}</b> <br/>   {message.chatmsg}
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


















              <form noValidate onSubmit={this.onSubmit} className="rcw-sender">


              <div className="btn-group">
                <div className="form-group1">

                <input type="text"
                className={classnames('form-control', 'btn-lg', 'rcw-new-message2', 'btfont',{
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





              </div>
}

  { this.state.show &&
              <div className="col-sm-3">
              <div className="chatflow">
                  <img src={user} alt="user" className="usericon" height="30px"/>

                  <div className="namebind">
                    <div className="clientname"></div>
                    <p className="customeremail">{this.state.customeremail}</p>
                  </div>
              </div>



              </div>
            }
            </div>
        </div>





        <div className="app_iddd">










        </div>








      </div>
    );
  }
}


export default AdminDashboard;
