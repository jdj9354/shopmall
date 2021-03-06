import React, {Component} from 'react';
import './MainLayout.css';
import * as Constants from '../../Constants.js';
import request from 'superagent'
import AuthManager from "../../auth/AuthManager";
import RoundedSearchBar from "../element/RoundedSearchBar";

class MainLayout extends Component {

    constructor(props) {
        super(props);

        var json = {menu: []};
        this.state = {
            data: json,
            user: "empty"
        }
    }

    async componentWillMount() {
        this.getSideMenuList();
        let authManager = new AuthManager();
        await authManager.init();
        let authResult = await authManager.getAuthInfo();
        this.state.user = authResult.user;
        this.forceUpdate();
    }


    getSideMenuList() {
        request.get('/api/menu/side')
            .end((err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                this.setState({data: data.body})
            });
    }


    render() {
        let cartImagePath = require('../../res/icon_cart.png');
        let myIconImagePath = require('../../res/icon_my.png');
        let signinImagePath = require('../../res/icon_signin.png');
        let emptyImagePath = require('../../res/empty.png');
        console.log(this.state.user);
        let isEmpty = (this.state.user == "empty");
        let isGuest = (this.state.user == "guest");
        return (

            <div>
                <div id="shopName">
                    <a href="/"><h5>URtheONLY1</h5></a>
                </div>
                <div id="contentWrpper">
                    <div id={"sideDiv"}>
                        <nav id="sideNav">
                            <ul>
                                {this.state.data.menu.map(el => (
                                    <li style={{marginBottom: el.margin + 'px'}}><a href={el.link}>{el.name}</a></li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div id="topNav">
                        <nav id="topNav">
                            <ul>

                                {isEmpty ? (<li>
                                        <a href="/login"><img src={emptyImagePath}/></a>
                                    </li>
                                ) : (
                                    isGuest ? (
                                        <li>
                                            <a href="/login"><img src={signinImagePath}/></a>
                                        </li>
                                    ) : (
                                        <li>
                                            <a href="/mypage"><img src={myIconImagePath}/></a>
                                        </li>
                                    ))}
                                <li>
                                    <a href="/cart"><img src={cartImagePath}/></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <RoundedSearchBar/>
                </div>
            </div>
        );
    }
}

export default MainLayout;
