import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';
import chatIcon from '../icon/chat-icon.png';

class Track extends Component {

  constructor(props){
    super(props);

    this.state = { show:true};
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


  constructor(props){
    super(props);

    this.state = {
      customeremail: '',
      requestid: '',
      errors:{},
      tttt:[],
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

      const newTrack = {
        customeremail: this.state.customeremail,
        requestid: this.state.requestid

      };
      //console.log(newIssue);
      axios

      .post('/api/tracker/checkstatus', newTrack)

      .then(res => {

        this.setState({ tttt: res.data.status_date, customeremail:'', requestid:'', show:false})


      })
      //.then(res => console.log(res.data))
    //  .then(result => this.setState({data: result.data.status_date}))
      .catch(err => this.setState({errors: err.response.data}));


      this.setState({
        // customeremail: '',
        // requestid:''
      });


  }






  render(){
    const { errors } = this.state;









    return(


      <div className="slidingDiv">

      <div className="mainHeading">
        <b><p className="headd">Track your Ticket Status</p></b>
      </div>



      <div className="mainArea">





      {this.state.tttt.map(item =>  <div key={item._id}>

        <div className="vl"></div>
     <div className="status">{item.status}<br/> </div>

        <div className="date">{item.date} </div>  </div>





      )}







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
      className={classnames('form-control','btn-sm', {
        'is-invalid' : errors.requestid
      })}
      id="requestid"
      placeholder="Enter Ticket No."
      name="requestid"
      value={this.state.requestid}
      onChange={this.onChange} />
      {errors.requestid && (<div className="invalid-feedback">{errors.requestid}</div>)}
    </div>
}


{ this.state.show &&

    <button type="submit" className="btn btn-success btn-sm">Track Status</button>
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


export default Track;
