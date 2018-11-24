

import React from 'react';
import { Link } from 'react-router';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import {Grid} from 'react-bootstrap';
import {Grid,Row,Col,Carousel,ProgressBar} from 'react-bootstrap';
import Divider from 'material-ui/Divider/Divider';
import restUrl from './restUrl';
import Forward from 'material-ui/svg-icons/content/forward';







export default class Home extends React.Component {
 
  state={
    balance:0
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  } 

  componentDidMount=()=>{
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    Axios({method:'get',
  url:'/api/getAdidasBalance'+'/'+retrievedUserDetails.role+'/'+retrievedUserDetails.name})
  .then((data) => {
    console.log('--------------result of balance ----------------');
    console.log(data)
    this.setState({balance:data.data.response});
  })
  .catch((err)=>{
    console.log('error in creating contract');
  })


  }
  routeToService=()=>{
     this.context.router.push('/myServices');
  }

  render() {

    // let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    
      
      return (
        <div style={{marginTop:"60px", minHeight:"600px"}} className="userbackground">
        <Grid style={{marginTop:"50px"}}>
           
           {/* <Row style={{marginTop:"10px"}}> */}
         
           <Col xs={12} style={{background:"white", height:"100px",marginTop:"50px"}}>
           <h4>{this.state.balance} wei</h4>
           <Divider />
              <Col xs={12} style={{background:"rgb(0, 188, 212)", color:"white"}} >
              <h3 >
           <center>Balance </center> </h3>
              </Col>
           
          
           
               </Col>
               {/*
           <Col xs={9} style={{background:"rgb(0, 188, 212)",height:"100px", color:"white",marginTop:"50px"}}>
           <center>
           <h3>
        
           </h3>
               
            </center>
               </Col> */}

               {/* <Col xs={6} style={{background:"white", height:"100px",marginTop:"30px"}}>
              <center>
           <h3 style={{marginTop:"30px"}}>Contract Status</h3>
          </center>
           
              </Col>
           <Col xs={6} style={{background:"rgb(0, 188, 212)",height:"100px", color:"white",marginTop:"30px"}}>
           <center>
          <h3>2 Live </h3>
          <Divider />
          <h3>3 Expired</h3>
            </center>
               </Col> */}
               </Grid>
               </div>
      )

    
      }
  }



