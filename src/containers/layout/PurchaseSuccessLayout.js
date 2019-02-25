import React, {Component} from 'react';

class PurchaseSuccessLayout extends Component{
    constructor(props){
        super(props);

        this.state = {
            orderInfo: props.orderInfo
        }
    }
    render() {
        return(
            <div className="PurchaseSuccessLayout">

            </div>
        )
    }
}

export default PurchaseSuccessLayout;