import React, {Component} from 'react';
import './ShopItemGrid.css';
import ShopItemRow from './ShopItemRow';
import request from "superagent";
import * as Constants from "../../../Constants";
import BackendController from "../../../controller/BackendController";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

let backendController = new BackendController();

class ShopItemGrid extends Component {

    constructor(props) {
        super(props);

        var json = {products: []};
        this.state = {
            data: json
        }
    }

    async componentWillMount() {
        let productList = await backendController.getAllItem();
        this.setState({data: productList});
    }


    render() {
        let products = this.state.data.products;
        let productsRow = [];
        let columnSize = this.props.col ? this.props.col : 3;
        for (let i = 0; i < products.length; i += columnSize) {
            let start = i;
            let end = i + columnSize >= products.length ? products.length : i + columnSize;

            productsRow.push(products.slice(start, end));
        }
        return (
            <div class="itemContainer">
                {
                    productsRow.map((el) => {
                        return <ShopItemRow products={el}/>;
                    })
                }
            </div>
        );
    }
}


export default ShopItemGrid;