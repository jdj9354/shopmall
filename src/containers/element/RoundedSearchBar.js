import React, {Component} from 'react';
import './RoundedSearchBar.css';
import BackendController from "../../controller/BackendController";

let backendController = new BackendController();

class RoundedSearchBar extends Component {

    async searchRequest(query){
        return await backendController.searchProduct(query,1,10);
    }

    render() {
        return (
            <div className="RoundedSearchBar">
                <div className="searchBarWrapper">
                    <input onKeyDown={async (event)=>{
                        if(event.keyCode == 13){
                            let result = await this.searchRequest(event.target.value);
                        }
                    }} type="text"></input>
                </div>
            </div>
        );
    }
}

export default RoundedSearchBar;