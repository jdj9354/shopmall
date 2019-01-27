import React, {Component} from 'react';
import './SearchResult.css';
import BackendController from "../../controller/BackendController";
import ShopItemRow from "./grid/ShopItemRow";

let backendController = new BackendController();

class SearchResult extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchQuery: props.searchQuery,
            page: 1,
            pageLimit: 10,
            resultItems: [],
            totalPage: 1
        }

        this.setState(this.state);
        this.requestSearchList(1);
    }

    async requestSearchList(page){
        let result = await backendController.searchProduct(this.state.searchQuery, page, this.state.pageLimit);
        if(result != null) {
            result = result.searchResult;
            this.setState({
                resultItems: result.docs,
                page: page,
                totalPage: result.pages
            });
        }
    }

    render() {

        let products = this.state.resultItems;
        let productsRow = [];
        let columnSize = this.props.col? this.props.col : 3;
        for(let i=0; i<products.length; i+=columnSize){
            let start = i;
            let end = i+columnSize >= products.length ? products.length  : i+columnSize;

            productsRow.push(products.slice(start,end));
        }

        let pageStart = Math.floor(this.state.page / 10) * 10 + 1;
        let pageEnd = pageStart + 9 >= this.state.totalPage ? this.state.totalPage : pageStart + 9;
        let pageTailText = [];
        for (let i = pageStart; i <= pageEnd; i++) {
            pageTailText.push(i);
        }

        let count = 0;

        return (
            <div className="SearchResult">
                <div className="itemContainer">
                    {
                        productsRow.map((el) => {
                            return <ShopItemRow products={el}/>;
                        })
                    }
                </div>
                <div className="footerWrapper">
                    {
                        <div className="arrow arrow-left" onClick={(event) => {
                            let targetIdx = Math.floor(this.state.page / 10) * 10;
                            if (targetIdx <= 1)
                                targetIdx = 1;
                            this.requestSearchList(targetIdx);
                        }
                        }></div>
                    }
                    <div>
                        {
                            pageTailText.map((text) => {
                                if (++count == this.state.page)
                                    return (
                                        <div className="selected"><strong>{text}</strong></div>
                                    )
                                else {
                                    return (
                                        <div onClick={(event) => {
                                            this.requestSearchList(event.target.innerText);
                                        }
                                        }>{text}</div>
                                    )
                                }
                            })
                        }
                    </div>
                    {
                        <div className="arrow arrow-right" onClick={(event) => {
                            let targetIdx = (Math.floor(this.state.page / 10) + 1) * 10;
                            if (targetIdx >= this.state.totalPage)
                                targetIdx = this.state.totalPage;
                            this.requestSearchList(targetIdx);
                        }}></div>
                    }
                </div>
            </div>
        )
    }
}

export default SearchResult;