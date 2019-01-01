import React, {Component} from 'react';
import "./ShopItem.css";

class ShopItem extends Component{

    render(){
        if(this.props.product)
            return (<div className="ShopItem" onClick={() => window.location.href= "/detail/"+this.props.product._id}>

                        <img src={this.props.product.thumbnailImageSrc}/><br></br>
                        {this.props.product.name}<br></br>
                        {this.props.product.price} {this.props.product.priceUnit}<br></br>
                    </div>)
        else
            return <div></div>
    }
}

export default ShopItem;