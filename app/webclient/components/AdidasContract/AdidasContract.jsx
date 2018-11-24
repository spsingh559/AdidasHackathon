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
import AccountAddress from '../AccountAddress';
import AdidasPendingContract from './AdidasPendingContract';
import AdidasExpiredContract from './AdidasExpiredContract';
// import VisibilityOff from 'material-ui/svg-icons/content/link_off';

// import TAPendingServiceDetail from './TAPendingServiceDetail';
// import TAApproveServiceDetail from './TAApproveServiceDetail';

let arr=[AccountAddress.Investor1,AccountAddress.Investor2,AccountAddress.Investor3,AccountAddress.Investor4,AccountAddress.Player];
export default class AdidasContract extends React.Component{

    state={
        actor:"",
        actorAddress:"",
        roi:"",
        fund:"",
        controlledDate: null,
        open:false,
        contractData:[]
    }

    handleChangeActor=(event, index, value) => this.setState({actor:value});
    handleChangeActorAddress=(event, index, value) => this.setState({actorAddress:value});
    handleChange = (event, date) => {
        this.setState({
          controlledDate: date,
        });
      };

      componentDidMount=()=>{
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        for(var i=0; i<arr.length;i++){
        Axios({method:'get',
        url:'/api/getMyContract/'+arr[i]
    }).then((data) => {
        console.log('--------------result of contract ----------------');
        console.log(data)
        let contractObj={
          adidasAddress:data.data.adidasAddress,
amount: data.data.amount,
contractId: data.data.contractId,
contractStatus: data.data.contractStatus,
duration: data.data.duration,
paymentStatus: data.data.paymentStatus,
returnPercentage: data.data.returnPercentage
        }
        
      let newData=this.state.contractData.concat([contractObj]);
      this.setState({contractData:newData});
             
      })
      .catch((err)=>{
        console.log('error in creating contract');
      })
    }
    }

      createContract=()=>{
        let date=new Date(this.state.controlledDate);
        let year= date.getFullYear();
        let currentDate=new Date();
        
          let contractObj={
            contractId:Date.now(),
            counterPartyAddress:this.state.actorAddress,
            amount:parseInt(this.state.fund),
            returnPercentage:parseInt(this.state.roi),
            duration:year-currentDate.getFullYear(),
            contractType:this.state.actor
          }
console.log(contractObj);
Axios({method:'post',
        url:'/api/createContract',
        data:contractObj
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

      handleRequestClose=()=>{
          this.setState({open:false});
      }

      pay=(index,amount)=>{
        Axios({method:'post',
        url:'/api/payToInvestorByAdidas',
        data:{investorAddress:arr[index]}
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
    render(){
console.log('this.state.contractData');
console.log(this.state.contractData);
     

        return(
            <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
            <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
               <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span>Manage Contracts </h4> </center>
         </div>
         <Tabs>
    <Tab
      icon={<Draft />}
      label="Create"
    >
   <Grid >
             <Col xs={12}>
             <SelectField 
           hintStyle={{color:"white"}}
           inputStyle={{color:"white"}}
           floatingLabelStyle={{color:"white"}}
           hintText="role"
          floatingLabelText="Select Player/Investor"
          value={this.state.actor}
          onChange={this.handleChangeActor}
          fullWidth={true}
        >
          <MenuItem value="A2I" primaryText="Investor" />
          <MenuItem value="A2P" primaryText="Player" />
        </SelectField>
    <br />

     <SelectField 
           hintStyle={{color:"white"}}
           inputStyle={{color:"white"}}
           floatingLabelStyle={{color:"white"}}
           hintText="role"
          floatingLabelText="Select Player/Investor Address"
          value={this.state.actorAddress}
          onChange={this.handleChangeActorAddress}
          fullWidth={true}
        >
          <MenuItem value="0xa7e3f2231f9574f421a7e8564fd73e9c36a0828c" primaryText="Investor -1 " />
          <MenuItem value="0xc87c56edd727b24ad67c82337221b815deb1aa2e" primaryText="Investor -2" />
          <MenuItem value="0x035e13f6088fdff3334f5cb0bef7d4474a352121" primaryText="Investor -3" />
          <MenuItem value="0xa08d4c2535ddb58de7a135720f8a7b8e4b8d24b5" primaryText="Investor -4" />
          <MenuItem value="0xfbce4d0ae59a9350afe2ab365920e51bf72c09c8" primaryText="Player" />
        </SelectField>
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

    <TextField
      hintText="Return Percentage"
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      floatingLabelText="How much % to be returned"
      value={this.state.roi}
      onChange = {(event,newValue) => this.setState({roi:newValue})}
    />
    <br />
    <DatePicker
        hintText="Duration"
        value={this.state.controlledDate}
        onChange={this.handleChange}
      />

        <br />


    
        <br />
    <center>
        <RaisedButton
      label="Submit"
      labelPosition="before"
      primary={true}
      onTouchTap={this.createContract}
      icon={<Send />}
    />
    </center>
    </Col>
    <Snackbar
          open={this.state.open}
          message={"Contract has been created with"}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
             </Grid>
      </Tab>
      <Tab
      icon={<Pending />}
      label="Live"
    >
    <Grid>
    
    <AdidasPendingContract  data={this.state.contractData} pay={this.pay}/>
   
    </Grid>
    </Tab>
    <Tab
      icon={<Inbox />}
      label="Expired"
    >
    <Grid>
    <AdidasExpiredContract  data={this.state.contractData}/>
    {/* <TAApproveServiceDetail  data={this.state.serviceData}/> */}
   
    </Grid>
    </Tab>
    
  </Tabs>
             </div>
        )
    }
   
}