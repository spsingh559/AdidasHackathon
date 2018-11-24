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
export default class EachShowVoteForPlayer extends React.Component{


    vote=()=>{
        this.props.vote(this.props.index);
    }
       render(){
console.log(this.props.data);
console.log('data in each')
   

        return(
            <div className="panel panel-primary" style={{marginTop:"10px"}}>
      <div className="panel-heading">Player : {this.props.data.rec}
</div>    
<div className="panel-body" style={{fontSize:"16"}}>
<Row>
      <Col xs={6}>
      Need Description:
      </Col>
      <Col xs={6}>
      {this.props.data.desc}
      </Col>
      </Row>
      <Row>
      <Col xs={6}>
      Amount Requested:
      </Col>
      <Col xs={6}>
      {this.props.data.value}
      </Col>
      </Row>
      <br />
    <Row>
      <Col xs={6}>
      Request Status : 
      </Col>
      <Col xs={6}>
     {this.props.data.completed==false?<p>Active</p>:<p>Expired</p>}
      </Col>
      </Row>
      <br />
      <Row>
      <Col xs={6}>
      No of Contributors:
      </Col>
      <Col xs={6}>
      {this.props.data.noOfVoters}
      </Col>
      </Row>
      <br />
      
</div>
<div className="panel-footer" style={{backgroundColor:"blue", color:"white"}}>
{this.props.data.completed==true?null:
<center>
        <RaisedButton
      label="Vote"
      primary={true}
            onTouchTap={this.vote}
    />
    </center>
}
</div>

            </div>
            
        )
    }
   
}