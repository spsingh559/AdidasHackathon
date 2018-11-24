import React from 'react';
import EachAdidasExpiredContract from './EachAdidasExpiredContract';



export default class AdidasExpiredContract extends React.Component{

   
    

   render(){

    let newData= this.props.data.map((data,i)=>{
        return(
            <EachAdidasExpiredContract
            key={i}
            index={i}
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