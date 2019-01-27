import React, {Component} from 'react';
import './RoundedSearchBar.css';
import BackendController from "../../controller/BackendController";

let backendController = new BackendController();

class RoundedSearchBar extends Component {

    render() {
        return (
            <div className="RoundedSearchBar">
                <div className="searchBarWrapper">
                    <input onKeyDown={async (event)=>{
                        if(event.keyCode == 13){
                            window.location.href='/search/'+event.target.value;
                        }
                    }} type="text"></input>
                </div>
            </div>
        );
    }
}

export default RoundedSearchBar;