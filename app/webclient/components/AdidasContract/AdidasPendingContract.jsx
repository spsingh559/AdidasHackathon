import React from 'react';
import EachAdidasPendingContract from './EachAdidasPendingContract';



export default class AdidasPendingContract extends React.Component{

    pay=(index,amount)=>{
        this.props.pay(index);
    }
    

   render(){

    let newData= this.props.data.map((data,i)=>{
        return(
            <EachAdidasPendingContract
            key={i}
            index={i}
            data={data}
            pay={this.pay}
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