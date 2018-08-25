import React, { Component } from 'react'
import axios from 'axios';
import chatIcon from '../icon/chat-icon.png';

import leftarrow from '../icon/leftarrow.png';
import cancel from '../icon/cancel.png';
import { Link } from 'react-router-dom';


class Faq extends Component {

  constructor(props){
    super(props);

    this.state = {
      show:true,
      errors:{},
      faqqq:[],
      user_id:'',
      data:[]
    };
    this.toggleDiv = this.toggleDiv.bind(this)
  }
  toggleDiv = () => {
    const { show } = this.state;
    this.setState({ show : !show})
  }



  componentDidMount() {
    // const { handle } = this.props.match.params;
    // console.log(handle);


          const newFaq = {
          user_id: this.props.match.params.handle // User Id will be considered as app_id
        };

        axios

        .post('/api/faq/faqq', newFaq)

        .then(res => {
          this.setState({ faqqq: res.data})
        })

        .catch(err => this.setState({errors: err.response.data}));


    }




  render(){


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
  }


      </div>

    );
  }
}





export default Faq;
