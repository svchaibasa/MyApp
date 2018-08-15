import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';
import chatIcon from '../icon/chat-icon.png';

class Issue extends Component {



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


class Box extends Component {


  constructor(props){
    super(props);

    this.state = {
      customeremail: '',
      clientname: '',
      clientquery: '',
      errors:{},
      isss:[],
      show:true,
      user_id:'',
      hidden:false

    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  onSubmit(e){
    e.preventDefault();

      const newIssue = {
        user_id: this.props.app_id,
        //user_id:"5b5454d7079bad399cbe72ba",  // User Id will be considered as app_id for initial testing
        customeremail: this.state.customeremail,
        clientname: this.state.clientname,
        clientquery: this.state.clientquery

      };
      //console.log(newIssue);
      axios

      .post('/api/tracker/clientissue', newIssue)

      .then(res => {
          this.setState({isss: res.data.requestid, customeremail:'', clientname:'', clientquery: '', show:false, hidden:true})
      })
    //  .then(res => console.log(res.data))
    //  .then(result => this.setState({data: result.data.requestid}))
      .catch(err => this.setState({errors: err.response.data}));

      this.setState({
        // customeremail: '',
        // clientname: '',
        // clientquery: ''
      });

  }






  render(){
    const { errors } = this.state;



  //  const dataa = (this.state || {}).isss





    return(

      <div className="slidingDiv">

      <div className="mainHeading">
        <b><p className="headd">Post your Inquiry / Issue</p></b>
      </div>



      <div className="mainArea">

      { this.state.hidden &&
      <div className="ticketShow">
         <div className="ticketNo">You Ticket No is -<b> {this.state.isss} </b> </div>
         <div className="ticketStatus">Status: Open</div>
      </div>

    }






  <form className="alignstyle" noValidate onSubmit={this.onSubmit}>


{ this.state.show &&
    <div className="form-group">

      <input type="email"
      className={classnames('form-control', 'btn-sm',{
        'is-invalid' : errors.customeremail
      })}
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

    <div className="form-group">

      <input type="text"
      className={classnames('form-control', 'btn-sm',{
        'is-invalid' : errors.clientname
      })}
      id="clientname"
      placeholder="Enter Your Name"
      name="clientname"
      value={this.state.clientname}
      onChange={this.onChange} />
      {errors.clientname && (<div className="invalid-feedback">{errors.clientname}</div>)}
    </div>


  }

  { this.state.show &&
    <div className="form-group">

      <textarea
      className={classnames('form-control', 'btn-sm',{
        'is-invalid' : errors.clientquery
      })}
      rows="2"
      id="clientquery"
      placeholder="Post your Issue / Issue"
      name="clientquery"
      value={this.state.clientquery}
      onChange={this.onChange} />
      {errors.clientquery && (<div className="invalid-feedback">{errors.clientquery}</div>)}
    </div>

  }

  { this.state.show &&
    <button type="submit" className="btn btn-success btn-sm">Submit</button>
  }
  </form>












  </div>

    <div className="Powered">
      <p>Powered by <b>Prackr</b></p>
    </div>


      </div>
    );
  }
}


export default Issue;
