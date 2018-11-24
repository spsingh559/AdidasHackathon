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
// import VisibilityOff from 'material-ui/svg-icons/content/link_off';

// import TAPendingServiceDetail from './TAPendingServiceDetail';
// import TAApproveServiceDetail from './TAApproveServiceDetail';
// import AccountAddress from '../AccountAddress';
import ShowPlayer from './ShowPlayer';

const Data=[
    {
        _id:1,
        playerName:"Dipa",
        myAchievement:"National Level athelete, State level Representation",
        myNeed:"having absolute passion for gymnast and willing to represent, india in next olympic game",
        sportSector:"Gymnast",
        ranking:9,
        fundNeeded:30000000,
        vote:1000000
},
{
    _id:2,
    playerName:"Sakshi",
    myAchievement:"state level wrestler",
    myNeed:" I am from remote area and there is no facility for training, given a chance i can show my worth ",
    sportSector:"Wrestling",
    ranking:76,
    fundNeeded:30000000,
    vote:100000023
},
{
    _id:3,
    playerName:"Deepak",
    myAchievement:"school level",
    myNeed:"I  am teenage but have ambition to grow and bring medal for my country",
    sportSector:"athlete",
    ranking:5467,
    vote:10000008
}
];

export default class Player extends React.Component{

    // state={
    //     playerData:[]
    // }
      
    render(){

     

        return(
            <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
            <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
               <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span> Player Details</h4> </center>
         </div>
        
   <Grid >
             <Col xs={12}>
             <ShowPlayer data={Data} />
             </Col>
             </Grid>
             </div>
        )
    }
   
}