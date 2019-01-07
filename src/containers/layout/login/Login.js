import React, {Component} from "react";
import "./Login.css";
import {Link} from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            withPurchase: props.withPurchase,
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        let icon_fb = require('../../../res/icon_fb.png');
        let icon_insta = require('../../../res/icon_insta.png');
        let icon_kakao = require('../../../res/icon_kakao.png');
        let icon_naver = require('../../../res/icon_naver.png');
        let icon_twitter = require('../../../res/icon_twitter.png');
        let noMemberShipBuyButton = <div></div>;
        if (this.state.withPurchase) {
            noMemberShipBuyButton = <div>
                <Link exact to={{pathname: "/order", noMemPurchase: true}}>비회원 주문</Link>
            </div>
        }
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <input type="email" id="email" autofocus
                           value={this.state.email}
                           onChange={this.handleChange}/>
                    <input type="password" id="password"
                           value={this.state.password}
                           onChange={this.handleChange}/>
                    <div>
                        <a className="on_toggle" onClick={(ev) => {
                            ev.target.parentElement.submit();
                        }}>Login</a>
                    </div>
                    <div>
                        <a className="on_toggle" href="/registration">회원 가입</a>
                    </div>
                    {noMemberShipBuyButton}
                </form>
                <div className="sns_login_group">
                    <img src={icon_fb}/>
                    <img src={icon_insta}/>
                    <img src={icon_kakao}/>
                    <img src={icon_naver}/>
                    <img src={icon_twitter}/>
                </div>
            </div>
        );
    }
}