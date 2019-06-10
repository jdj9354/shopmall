import React, {Component} from "react";
import "./Login.css";
import * as Constants from '../../../Constants';
import * as Util from '../../../Util';
import {Link} from "react-router-dom";
import AuthManager from "../../../auth/AuthManager";
import {backend} from "../../../Constants";
import BackendController from "../../../controller/BackendController";

let authManager = new AuthManager();

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            forwarding: props.forwarding,
            onLoginSuccess: props.onLoginSuccess
        };
    }

    async componentDidMount() {
        authManager.init();
        //authManager.loadFacebookSDK();
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
        let forwarding = this.state.forwarding;
        let onLoginSuccess = this.state.onLoginSuccess;

        return (
            <div className="Login">
                <form method="post" action={"/api/auth/login"} id="loginForm"
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
                            let xhr = new XMLHttpRequest();
                            xhr.open("POST", "/api/auth/login");
                            xhr.onload = function (event) {
                                let response = JSON.parse(event.target.response);
                                if (response.statusCode != 200) {
                                    window.alert("아이디/패스워드를 확인해 주세요");
                                } else {
                                    response = JSON.parse(event.target.response);
                                    let response = JSON.parse(response.body);
                                    var expireDate = Util.dateFromISO8601(response.expires_in);
                                    authManager.setAuthInfo(response.user, response.access_token,
                                        response.refresh_token, expireDate, "basic");
                                    if (onLoginSuccess)
                                        onLoginSuccess();
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
                        <Link className="on_toggle" exact to={{pathname: "/registration", forwarding: forwarding}}>회원
                            가입</Link>
                    </div>
                </form>
                <div className="sns_login_group">
                    <img src={icon_fb} onClick={async () => {
                        (authManager.loginWithFaceBook())
                            .then(() => {
                                window.location.href = this.state.forwarding;
                            })
                            .catch(() => {
                                window.alert("로그인에 실패하였습니다");
                            });

                    }}/>
                    <img src={icon_insta} onClick={async (event) => {
                        // let backendController = new BackendController();
                        // let authResult = backendController.requestAPI("/api/auth/instagram",{},"POST");

                        let instaAuthResult = await fetch("/api/auth/instagram",
                            {
                                header: {
                                    'Access-Control-Allow-Origin:': "*",
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                method: 'POST'

                            });
                        let instaAuthWindow = window.open(instaAuthResult.url,
                            'windowNew', 'width=500, height=800');
                        window.onLoginSuccess = (authInfo) => {
                            let parsedAuthInfo = JSON.parse(authInfo);
                            authManager.setAuthInfo(parsedAuthInfo.username,
                                parsedAuthInfo.access_token, null, null, "instagram");
                            window.location = "/";
                        };

                        // let xhr = new XMLHttpRequest();
                        // xhr.open("POST", "/api/auth/instagram");
                        // xhr.send();
                        //
                        // xhr.onload = function (event) {
                        //     let response = event.target.response;
                        //     console.log(response);
                        //     if (response.statusCode != 302) {
                        //         window.alert("Instagram 계정 정보를 확인해 주세요");
                        //     } else {
                        //         console.log(response);
                        //     }
                        // }
                    }}/>
                    <img src={icon_kakao} onClick={async (event) => {
                        let kakaoAuthResult = await fetch("/api/auth/kakao",
                            {
                                header: {
                                    'Access-Control-Allow-Origin:': "*",
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                method: 'POST'
                            });
                        let kakaoAuthWindow = window.open(kakaoAuthResult.headers.get('location'), 'windowNew',
                            'width=500, height=800');
                        window.onLoginSuccess = (authInfo) => {
                            let parsedAuthInfo = JSON.parse(authInfo);
                            window.alert(parsedAuthInfo.access_token);
                            authManager.setAuthInfo(null, parsedAuthInfo.access_token,
                                parsedAuthInfo.refresh_token, parsedAuthInfo.expires_in, "kakao");
                            window.location = "/";
                        };
                    }}/>
                    <img src={icon_naver}/>
                    <img src={icon_twitter}/>
                </div>
            </div>
        );
    }
}