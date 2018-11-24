import React from 'react';
import {Col, Row, Grid,Image} from 'react-bootstrap';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Axios from 'axios';
import restUrl from '../restUrl';
import Send from 'material-ui/svg-icons/content/send';
import Snackbar from 'material-ui/Snackbar';
import Draft from 'material-ui/svg-icons/content/create';
import Inbox from 'material-ui/svg-icons/content/inbox';
import Pending from 'material-ui/svg-icons/content/report';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import Visibility from 'material-ui/svg-icons/content/link';
import { request } from 'https';

export default class MyPayment extends React.Component{

    
    componentDidMount=()=>{
        Axios({method:'get',
        url:'/api/noOfRequest'})
        .then((data) => {
          console.log('--------------result of request ----------------');
          console.log(data)
          if(data.data==0){
              alert('no request found');
          }else{
            for(var i=0; i<data.data.response;i++){
                this.request(i);
            }
            
            
          }
          // this.setState({balance:data.data.response});
        })
        .catch((err)=>{
          console.log('error in creating contract');
        })
    }

   request=(i)=>{
    Axios({method:'get',
    url:'/api/eachRequest/'+i})
    .then((data) => {
      console.log('--------------result of request ----------------');
      console.log(data)
      let reqObj={
        completed: data.data.response.completed,
        desc: data.data.response.desc,
        noOfVoters: data.data.response.noOfVoters,
        rec: data.data.response.rec,
        value: data.data.response.value
      }
      let newData=[reqObj].concat(this.state.reqData);
      this.setState({reqData:newData});
      console.log('newData',newData);
        
        
      
    })
    .catch((err)=>{
      console.log('error in creating contract');
    })
   }

   vote=(index)=>{
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    Axios({method:'post',
        url:'/api/sendVote',
    data:{index:index,name:retrievedUserDetails.name}})
        .then((data) => {
          console.log('--------------result of vote is ----------------');
          console.log(data);
          alert('Transaction hash is'+ data.data.txHash);
          location.reload();
        })
        .catch((err)=>{
          console.log('error in creating contract');
        })
   }
    
      
    render(){

     

        return(
            <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
            <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
               <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span>Vote For Player</h4> </center>
         </div>
        
   <Grid >
             <Col xs={12}>
             <ShowVoteForPlayer data={this.state.reqData} vote={this.vote}/>
             </Col>
             </Grid>
             </div>
        )
    }
   
}