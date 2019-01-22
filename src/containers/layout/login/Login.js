import React, {Component} from "react";
import "./Login.css";
import * as Constants from '../../../Constants';
import * as Util from '../../../Util';
import {Link} from "react-router-dom";
import AuthManager from "../../../auth/AuthManager";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            forwarding: props.forwarding
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        console.log("aeasdf");
        window.alert(event);
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    render() {
        let icon_fb = require('../../../res/icon_fb.png');
        let icon_insta = require('../../../res/icon_insta.png');
        let icon_kakao = require('../../../res/icon_kakao.png');
        let icon_naver = require('../../../res/icon_naver.png');
        let icon_twitter = require('../../../res/icon_twitter.png');

        return (
            <div className="Login">
                <form method="post" action={Constants.backend + "/api/auth/login"} id="loginForm"
                      onSubmit={this.handleSubmit}>
                    <input type="email" id="email" name="username" autofocus
                           value={this.state.email}
                           onChange={this.handleChange}/>
                    <input type="password" id="password" name="password"
                           value={this.state.password}
                           onChange={this.handleChange}/>
                    <div>
                        <a className="on_toggle" onClick={(ev) => {
                            // this.setState({
                            //     email: new Buffer(this.state.email).toString('base64'),
                            //     password: new Buffer(this.state.password).toString('base64')
                            // });
                            let loginObj = this;
                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", Constants.backend + "/auth/login");
                            xhr.onload = function (event) {
                                let response = JSON.parse(event.target.response);
                                console.log(response)
                                if (response.statusCode != 200) {
                                    window.alert("아이디/패스워드를 확인해 주세요");
                                } else {
                                    response = JSON.parse(event.target.response);
                                    let response = JSON.parse(response.body);
                                    var expireDate = Util.dateFromISO8601(response.expires_in);
                                    new AuthManager().setAuthInfo(response.user, response.access_token, response.refresh_token, expireDate);
                                    window.location.href = loginObj.state.forwarding;
                                }
                            };
                            var formData = new FormData(document.getElementById("loginForm"));
                            xhr.setRequestHeader('Content-type', 'application/json')
                            xhr.send(JSON.stringify({
                                username: new Buffer(this.state.email).toString('base64'),
                                password: new Buffer(this.state.password).toString('base64')
                            }));
                        }}>Login</a>
                    </div>
                    <div>
                        <a className="on_toggle" href="/registration">회원 가입</a>
                    </div>
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