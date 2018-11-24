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
import AccountAddress from '../AccountAddress'
export default class EachAdidasPendingContract extends React.Component{

    pay=()=>{
        this.props.pay(this.props.index);
    }

    
       render(){
       

     let arr=['InvestorPaidToAdidas', 'AdidasPaymentPendingWithInvestor','AdidasPaidReturnToInvestor','AdidasSetGoalToPlayer','PlayerPaidReturnToAdidas','PlayerPaymentPendingWithAdidas'];
if(this.props.data.contractStatus==false){
    return null
}else{
        return(
            
         <div className="panel panel-primary" style={{marginTop:"50px"}}>
      <div className="panel-heading">
      <center>Contract Id : {this.props.data.contractId}</center></div>
      <div className="panel-body" style={{fontSize:"16"}}>
      <Row>
      <Col xs={6}>
      Amount To Pay
      </Col>
      <Col xs={6}>
      {this.props.data.amount}
      </Col>
      </Row>
<br />
<Row>
      <Col xs={6}>
      Return Percentage
      </Col>
      <Col xs={6}>
      {this.props.data.returnPercentage}
      </Col>
      </Row>
<br />
      <Row>
      <Col xs={6}>
      Adidas Address
      </Col>
      <Col xs={6}>
      {this.props.data.adidasAddress}
      </Col>
      </Row>
      <br />
    <Row>
      <Col xs={4}>
      Payment Status : 
      </Col>
      <Col xs={6}>
      {arr[parseInt(this.props.data.paymentStatus)]}
      </Col>
      </Row>
      <br />
      <Row>
      <Col xs={6}>
      Contract Status :
      </Col>
      <Col xs={6}>
      {this.props.data.contractStatus==true?<p>Active </p>:<p>Expired</p>}
      </Col>
      </Row>
      <br />
      <Row>
      <Col xs={6}>
      Duration 
      </Col>
      <Col xs={6}>
      {this.props.data.duration+"year"} 
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
    )
        }         
    }
   
}