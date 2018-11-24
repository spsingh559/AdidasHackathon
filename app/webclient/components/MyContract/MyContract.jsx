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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
// import VisibilityOff from 'material-ui/svg-icons/content/link_off';

// import TAPendingServiceDetail from './TAPendingServiceDetail';
// import TAApproveServiceDetail from './TAApproveServiceDetail';
let AccountAddress={
    Investor1:'0xa7e3f2231f9574f421a7e8564fd73e9c36a0828c',
    Investor2:'0xc87c56edd727b24ad67c82337221b815deb1aa2e',
    Investor3:'0x035e13f6088fdff3334f5cb0bef7d4474a352121',
    Investor4:'0xa08d4c2535ddb58de7a135720f8a7b8e4b8d24b5',
    Player:'0xfbce4d0ae59a9350afe2ab365920e51bf72c09c8'
}

export default class MyContract extends React.Component{

    state={
        contract:{},
        open: false
    }

    componentDidMount=()=>{
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        Axios({method:'get',
        url:'/api/getMyContract/'+AccountAddress[retrievedUserDetails.name]
    }).then((data) => {
        console.log('--------------result of contract ----------------');
        console.log(data)
        
        this.setState({contract:data.data});
        
      })
      .catch((err)=>{
        console.log('error in creating contract');
      })
    }
    
    handleClose = () => {
        this.setState({open: false});
      };

    pay=()=>{
         let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
         if(retrievedUserDetails.role=="P"){
            this.setState({open:true});
         }else{
        this.axioFun(retrievedUserDetails.name,this.state.contract.amount)
    }
    }

    axioFun=(name,amount)=>{
        Axios({method:'get',
        url:'/api/payToAdidasByInvestor/'+parseInt(amount)+'/'+name
    }).then((data) => {
        console.log('--------------result of contract ----------------');
        console.log(data)    
        alert('Transaction hash is'+data.data.response);   
        location.reload();
        
      })
      .catch((err)=>{
        console.log('error in creating contract');
      })
    }

    payToAdidas=()=>{
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
       this.axioFun(retrievedUserDetails.name,(1000000*this.state.contract.returnPercentage)/100);
    }

    render(){

        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Approve"
              primary={true}
              keyboardFocused={true}
              onClick={this.payToAdidas}
            />,
          ];

     let arr=['InvestorPaidToAdidas', 'AdidasPaymentPendingWithInvestor','AdidasPaidReturnToInvestor','AdidasSetGoalToPlayer','PlayerPaidReturnToAdidas','PlayerPaymentPendingWithAdidas'];

        return(
            <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
            <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
               <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span>My Contract </h4> </center>
         </div>
         <div className="panel panel-primary" style={{marginTop:"50px"}}>
      <div className="panel-heading">
      <center>Contract Id : {this.state.contract.contractId}</center></div>
      <div className="panel-body" style={{fontSize:"16"}}>
      <Row>
      <Col xs={6}>
      Amount To Pay
      </Col>
      <Col xs={6}>
      {this.state.contract.amount}
      </Col>
      </Row>
<br />
<Row>
      <Col xs={6}>
      Return Percentage
      </Col>
      <Col xs={6}>
      {this.state.contract.returnPercentage}
      </Col>
      </Row>
<br />
      <Row>
      <Col xs={6}>
      Adidas Address
      </Col>
      <Col xs={6}>
      {this.state.contract.adidasAddress}
      </Col>
      </Row>
      <br />
    <Row>
      <Col xs={4}>
      Payment Status : 
      </Col>
      <Col xs={6}>
      {arr[parseInt(this.state.contract.paymentStatus)]}
      </Col>
      </Row>
      <br />
      <Row>
      <Col xs={6}>
      Contract Status :
      </Col>
      <Col xs={6}>
      {this.state.contract.contractStatus==true?<p>Active </p>:<p>Expired</p>}
      </Col>
      </Row>
      <br />
      <Row>
      <Col xs={6}>
      Duration 
      </Col>
      <Col xs={6}>
      {this.state.contract.duration+"year"} 
      </Col>
      </Row>
      <br />

      </div>
      <div className="panel-footer" style={{backgroundColor:"blue", color:"white"}}>
      <center>
        <RaisedButton
      label="Pay"
      primary={true}
      onTouchTap={this.pay}
    />
    </center>
      </div>
    </div>
    <Dialog
          title="Total Earning in 2023"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Your Total Earning in 2023 is USD 1 Million, Are you ready to return {(1000000*this.state.contract.returnPercentage)/100}
        </Dialog>
             </div>
        )
    }
   
}