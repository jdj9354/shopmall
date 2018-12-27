import React, {Component} from 'react';
import ShopItem from './ShopItem';
import './ShopItemRow.css'

class ShopItemRow extends Component{
    render(){
        let products = this.props.products;
        return(
            <div class="itemRow">{
                products.map(el=>{
                    return(
                        <ShopItem product={el}/>
                    );
                })
            }
            </div>
        )
    }
}

export default ShopItemRow;