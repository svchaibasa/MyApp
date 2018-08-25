import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';
import chatIcon from '../icon/chat-icon.png';

import leftarrow from '../icon/leftarrow.png';
import cancel from '../icon/cancel.png';
import { Link } from 'react-router-dom';

class Track extends Component {

  constructor(props){
    super(props);

    this.state = {
      customeremail: '',
      requestid: '',
      errors:{},
      tttt:[],
      show:true,
      hidden:true,
      notracker:''

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

        const newTrack = {
          customeremail: this.state.customeremail,
          requestid: this.state.requestid

        };

        axios

        .post('/api/tracker/checkstatus', newTrack)

        .then(res => {

          this.setState({ tttt: res.data.status_date, customeremail:'', requestid:'', hidden:false})


        })

      //  .catch(err => console.log({errors: err.response.data}));
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





        <b><p className="headd">Track your Ticket Status</p></b>
      </div>















      <div className="mainArea">

      {this.state.tttt.map(item =>  <div key={item._id}>

        <div className="vl"></div>
     <div className="status">{item.status}<br/> </div>

        <div className="date">{item.date} </div>  </div>

      )}





      { this.state.hidden &&
     <div className="errstatus">{errors.notracker}<br/> </div>
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


{ this.state.hidden &&

    <button type="submit" disabled={!(this.state.customeremail && this.state.requestid)} className="btn btn-success btn-sm">Track Status</button>
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



export default Track;
