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
// import VisibilityOff from 'material-ui/svg-icons/content/link_off';

// import TAPendingServiceDetail from './TAPendingServiceDetail';
// import TAApproveServiceDetail from './TAApproveServiceDetail';
import AccountAddress from '../AccountAddress';

export default class CreateRequest extends React.Component{

    state={
        desc:"",
        playerAddress:'',
        fund:0,
    }

   

    createRequest=()=>{
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        
          let requestObj={
            _desc:this.state.desc,
            _rec:AccountAddress[retrievedUserDetails.name],
            _value:parseInt(this.state.fund)
          }

console.log(requestObj);
Axios({method:'post',
        url:'/api/createRequest/'+retrievedUserDetails.name,
        data:requestObj
}).then((data) => {
    console.log('--------------result of Create Schema ----------------');
    console.log(data)
    
    if(data.data.response=='success'){
      alert(data.data.txHash);
    }else{
      alert('Error while creating contract');
    }
    
  })
  .catch((err)=>{
    console.log('error in creating contract');
  })
      }

      

      
    render(){

     

        return(
            <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
            <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
               <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span>Create Request </h4> </center>
         </div>
        
   <Grid >
             <Col xs={12}>
             <TextField
      hintText="Describe your need"
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      floatingLabelText="What is your need"
      value={this.state.desc}
      onChange = {(event,newValue) => this.setState({desc:newValue})}
    />
    <br />
         
     <TextField
      hintText="Agreed Fund"
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      floatingLabelText="How much amount to be invested"
      value={this.state.fund}
      onChange = {(event,newValue) => this.setState({fund:newValue})}
    />
    <br />

   
    


    
        <br />
    <center>
        <RaisedButton
      label="Submit Request"
      labelPosition="before"
      primary={true}
      onTouchTap={this.createRequest}
      icon={<Send />}
    />
    </center>
    </Col>
    </Grid>
             </div>
        )
    }
   
}