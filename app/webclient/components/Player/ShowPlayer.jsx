import React from 'react';

import EachPlayer from './EachPlayer';
export default class ShowPlayer extends React.Component{

    render(){

       let newData= this.props.data.map((data,i)=>{
return(
    <EachPlayer 
    key={i}
    data={data}
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