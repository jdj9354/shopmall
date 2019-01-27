import React, {Component} from 'react';
import './SearchResult.css';
import BackendController from "../../controller/BackendController";

class SearchResult extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchQuery: props.searchQuery
            page: 1,
            pageLimit: 10,
            resultItems: [],
            totalPage: 1
        }

        BackendController.

        this.setState(this.state);
    }

    render(){
        return(
            <div className="SearchResult">

            </div>
        )
    }
}

export default SearchResult