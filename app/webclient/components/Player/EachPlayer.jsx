import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class EachPlayer extends React.Component{

    render(){
      
       
        return(
<Card style={{marginTop:"10px"}} >
        <CardHeader
          title={this.props.data.playerName}
          subtitle={this.props.data.sportSector+" Rank : " +this.props.data.ranking  }
          avatar="../../images/playerBG.png"
          actAsExpander={true}
          showExpandableButton={true}
        />
        
        
        <CardTitle title="My Achivement" subtitle={this.props.data.myAchievement} expandable={true} />
        <CardText expandable={true}>
          My Need : {this.props.data.myNeed}
          <br />
          <p>
          Current Fund Needed :{this.props.data.fundNeeded}
          </p>
          <p>
          People Vote :{this.props.data.vote}
          </p>
         
                  </CardText>
        <CardActions>
          <FlatButton label="Share"  />
          <FlatButton label="Inform Adidas" />
        </CardActions>
      </Card>
        )
    }
}