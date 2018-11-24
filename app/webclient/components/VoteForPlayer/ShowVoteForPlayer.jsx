import React from 'react';
import EachShowVoteForPlayer from './EachShowVoteForPlayer';



export default class ShowVoteForPlayer extends React.Component{

    vote=(index)=>{
        this.props.vote(index);
    }
    

   render(){

    let newData= this.props.data.map((data,i)=>{
        return(
            <EachShowVoteForPlayer
            key={i}
            index={i}
            data={data}
            vote={this.vote}
            />
        )
    })

    return(
        <div>
{newData}
        </div>
    )
   }
}