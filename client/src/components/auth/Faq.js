import React, { Component } from 'react'
import axios from 'axios';
import chatIcon from '../icon/chat-icon.png';


class Faq extends Component {

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
      errors:{},
      faqqq:[],
      user_id:''
    };
  }



componentDidMount() {
        const newFaq = {
        user_id: this.props.app_id,
        //user_id:"5b5454d7079bad399cbe72ba"  // User Id will be considered as app_id for initial testing
      };
      //console.log(newIssue);
      axios

      .post('/api/faq/faqq', newFaq)

      .then(res => {
        this.setState({ faqqq: res.data})
      })
      //.then(res => console.log(res.data))
    //  .then(result => this.setState({data: result.data.status_date}))
      .catch(err => this.setState({errors: err.response.data}));


  }






  render(){







    return(


      <div className="slidingDiv">


        <div className="mainHeading">
          <b><p className="headd">Frequently Asked Questions</p></b>
        </div>



        <div className="mainArea">




                 {this.state.faqqq.map(item =>  <div key={item._id}>

                <div className="qns">{item.qns}<br/> </div>

                   <div className="ans">{item.ans} </div> </div>


                 )}






         </div>





      <div className="Powered">
        <p>Powered by <b>Prackr</b></p>
      </div>


    </div>
    );
  }
}


export default Faq;
