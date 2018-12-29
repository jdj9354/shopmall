import React, {Component} from 'react';
import './IndexLayout.css'
import ShopItemGrid from "./grid/ShopItemGrid";

class IndexLayout extends Component {
    render(){
        return (
            <div>
                <ShopItemGrid/>
            </div>
        )
    }
}

export default IndexLayout;