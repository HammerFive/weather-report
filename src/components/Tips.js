import React from "react";

class Tips extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let weather = this.props.weather;
        return (
            <div>
                {
                    weather.data[0].index.map((item,index)=>{
                       return(
                           <div className={'list'}>
                               <h3>{item.title}</h3>
                               <p>{item.level}</p>
                               <p>{item.desc}</p>
                           </div>
                       )
                    })
                }
            </div>
        );
    }
}
export default Tips;