import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';
import chatIcon from '../icon/chat-icon.png';

import leftarrow from '../icon/leftarrow.png';
import cancel from '../icon/cancel.png';
import { Link } from 'react-router-dom';

class Issue extends Component {


  constructor(props){
    super(props);

    this.state = {
      customeremail: '',
      clientname: '',
      clientquery: '',
      errors:{},
      isss:[],
      user_id:'',
      show:true,
      hidden:true,
      visible:false

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

      const newIssue = {
        user_id: this.props.match.params.handle, // User Id will be considered as app_id

        customeremail: this.state.customeremail,
        clientname: this.state.clientname,
        clientquery: this.state.clientquery

      };

      axios

      .post('/api/tracker/clientissue', newIssue)

      .then(res => {
          this.setState({isss: res.data.requestid, customeremail:'', clientname:'', clientquery: '', hidden:false, visible:true})
      })

      .catch(err => this.setState({errors: err.response.data}));


  }









  render(){
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

        <b><p className="headd">Post your Inquiry / Issue</p></b>
      </div>



      <div className="mainArea">

      { this.state.visible &&
      <div className="ticketShow">
         <div className="ticketNo">You Ticket No is -<b> {this.state.isss} </b> </div>
         <div className="ticketStatus">Status: Open</div>
      </div>

    }






  <form className="alignstyle" noValidate onSubmit={this.onSubmit}>


{ this.state.hidden &&
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

  { this.state.hidden &&

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

  { this.state.hidden &&
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

  { this.state.hidden &&
    <button type="submit" disabled={!(this.state.customeremail && this.state.clientname && this.state.clientquery)} className="btn btn-success btn-sm">Submit</button>
  }
  </form>


  </div>

    <div className="Powered">
      <p>Powered by <b>Prackr</b></p>
    </div>


      </div>
}
      </div>

    );
  }
}



export default Issue;
