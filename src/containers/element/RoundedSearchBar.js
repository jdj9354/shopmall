import React, {Component} from 'react';
import './RoundedSearchBar.css';

class RoundedSearchBar extends Component {
    render() {
        return (
            <div className="RoundedSearchBar">
                <div className="searchBarWrapper">
                    <input type="text"></input>
                </div>
            </div>
        );
    }
}

export default RoundedSearchBar;