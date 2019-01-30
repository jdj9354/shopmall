import React, {Component} from 'react';
import './Registration.css';
import request from "superagent";
import * as Constants from "../../../Constants";
import BackendController from "../../../controller/BackendController";
import * as Util from "../../../Util";
import AuthManager from "../../../auth/AuthManager";

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forwarding: props.forwarding,
            email: {text: "", isValid: false},
            password: {text: "", isValid: false},
            passwordConfirm: {text: "", isValid: false},
            lastName: {text: "", isValid: false},
            firstName: {text: "", isValid: false},
            phone: {text: "", isValid: false},
            year: {text: "", isValid: false},
            month: {text: "", isValid: false},
            day: {text: "", isValid: false},
            gender: {text: "", isValid: false},
        };

        request.get(Constants.backend + '/menu/tos')
            .end((err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                this.setState({tos: data.body.tos})
                request.get(Constants.backend + '/menu/personalInformation')
                    .end((err, data) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        this.setState({pi: data.body.pi})
                    });
            });
    }

    handleChange = event => {

        //Check Validity
        if (event.target.id == "email") {
            if (event.target.validity.valid) {
                this.state.email.isValid = true;
                event.target.nextSibling.style.display = "none";
            } else {
                this.state.email.isValid = false;
                event.target.nextSibling.style.display = "block";
            }
        } else if (event.target.id == "password") {
            let passwordConfirmObj = document.getElementById("passwordConfirm");
            if (passwordConfirmObj.value != event.target.value) {
                event.target.nextSibling.nextSibling.style.display = "block";
                this.state.passwordConfirm.isValid = false;
            } else {
                event.target.nextSibling.style.display = "none";
                this.state.passwordConfirm.isValid = true;
            }
            this.state.password.isValid = true;
        } else if (event.target.id == "passwordConfirm") {
            let passwordObj = document.getElementById("password");
            if (passwordObj.value != event.target.value) {
                event.target.nextSibling.style.display = "block";
                this.state.passwordConfirm.isValid = false;
            } else {
                event.target.nextSibling.style.display = "none";
                this.state.passwordConfirm.isValid = true;
            }
        } else {
            if (event.target.value == "") {
                this.state[event.target.id].isValid = false;
            } else {
                this.state[event.target.id].isValid = true;
            }
        }

        this.setState({
            [event.target.id]: {text: event.target.value, isValid: this.state[event.target.id].isValid}
        });
    }

    handleDateChange = event => {
        let dateValue = 0;
        try {
            dateValue = parseInt(event.target.value);
        } catch (e) {
            this.setState({
                [event.target.id]: {text: "", isValid: false}
            });
            return;
        }

        if (isNaN(dateValue)) {
            this.setState({
                [event.target.id]: {text: "", isValid: false}
            });
            return;
        }

        if (event.target.value == "") {
            this.setState({
                [event.target.id]: {text: event.target.value, isValid: false}
            });
            return;
        }

        if (event.target.id == "year") {
            if (dateValue < 1)
                return;
        }

        if (event.target.id == "month") {
            if (dateValue < 1 || dateValue > 12)
                return;
        }
        if (event.target.id == "day") {
            if (dateValue < 1 || dateValue > 31)
                return;
        }
        this.setState({
            [event.target.id]: {text: dateValue, isValid: true}
        });
    }

    render() {
        return (
            <div className="Registration">
                <form onSubmit={this.handleSubmit}>
                    <div className="authField">
                        <input type="email" id="email" autoFocus
                               value={this.state.email.text}
                               onChange={this.handleChange}
                               placeholder="email"/>
                        <div className="errorToolTip">
                            <span className="tooltiptext">이메일 주소를 확인해주세요</span>
                        </div>

                        <input type="password" id="password"
                               value={this.state.password.text}
                               onChange={this.handleChange}
                               placeholder="password"/>
                        <input type="password" id="passwordConfirm"
                               value={this.state.passwordConfirm.text}
                               onChange={this.handleChange}
                               placeholder="password 확인"/>
                        <div className="errorToolTip">
                            <span className="tooltiptext">패스워드를 확인해 주세요</span>
                        </div>
                    </div>
                    <div className="personalInfo">
                        개인 정보
                        <div className="nameField">
                            <div className="rightPaddingDiv">
                                <input type="text" id="lastName" autoFocus
                                       value={this.state.lastName.text}
                                       onChange={this.handleChange}
                                       autoComplete="off"
                                       placeholder="성"/>
                            </div>
                            <div>
                                <input type="text" id="firstName"
                                       value={this.state.firstName.text}
                                       onChange={this.handleChange}
                                       autoComplete="off"
                                       placeholder="이름"/>
                            </div>
                        </div>

                        <div className="phoneNumberField">
                            <input type="tel" id="phone"
                                   value={this.state.phone.text}
                                   onChange={this.handleChange}
                                   autoComplete="off"
                                   placeholder="전화번호"/>
                        </div>
                        생년 월일
                        <div className="birthdayField">
                            <div className="rightPaddingDiv">
                                <input type="text" id="year"
                                       value={this.state.year.text}
                                       onChange={this.handleDateChange}
                                       autoComplete="off"
                                       placeholder="년"/>
                            </div>
                            <div className="rightPaddingDiv">
                                <input type="text" id="month"
                                       value={this.state.month.text}
                                       onChange={this.handleDateChange}
                                       autoComplete="off"
                                       placeholder="월"/>
                            </div>
                            <div>
                                <input type="text" id="day"
                                       value={this.state.day.text}
                                       onChange={this.handleDateChange}
                                       autoComplete="off"
                                       placeholder="일"/>
                            </div>
                        </div>
                        <div className="genderField">
                            <select type="phone" id="gender"
                                    value={this.state.gender.text}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    placeholder="성별">
                                <option value="0">성별</option>
                                <option value="2">여성</option>
                                <option value="1">남성</option>
                            </select>
                        </div>
                        <div className="nextStep">
                            <a onClick={() => {
                                let isAllValid = true;

                                for (let [key, value] of Object.entries(this.state)) {
                                    if(!value)
                                        continue;
                                    if (value.isValid == undefined)
                                        continue;
                                    if (value.isValid == false) {
                                        isAllValid = false;
                                        break;
                                    }
                                }

                                if (!isAllValid) {
                                    window.alert("입력란을 확인해주세요")
                                    return;
                                } else {
                                    let formTarget = document.querySelector(".Registration form");
                                    let termsOfService = document.querySelector(".Registration #termsOfService");
                                    formTarget.classList.add("hide");
                                    termsOfService.classList.add("show");
                                }
                            }} className="on_toggle">다음 단계</a>
                        </div>
                    </div>
                </form>
                <div id="termsOfService">
                    이용 약관
                    <div className="contents">
                        {this.state.tos}
                    </div>
                    <div>
                        <div onClick={() => {
                            let formTarget = document.querySelector(".Registration form");
                            let termsOfService = document.querySelector(".Registration #termsOfService");
                            termsOfService.classList.remove("show");
                            formTarget.classList.remove("hide");

                        }} className="stepDiv">
                            이전 단계
                        </div>
                        <div onClick={() => {
                            let termsOfService = document.querySelector(".Registration #termsOfService");
                            let personalInformation = document.querySelector(".Registration #personalInformation");
                            termsOfService.classList.remove("show");
                            personalInformation.classList.add("show");
                        }} className="stepDiv">
                            동의
                        </div>
                    </div>
                </div>
                <div id="personalInformation">
                    개인정보 수집 및 이용 동의
                    <div className="contents">
                        {this.state.pi}
                    </div>
                    <div onClick={() => {
                        let termsOfService = document.querySelector(".Registration #termsOfService");
                        let personalInformation = document.querySelector(".Registration #personalInformation");
                        termsOfService.classList.add("show");
                        personalInformation.classList.remove("show");
                    }} className="stepDiv">
                        이전 단계
                    </div>
                    <div onClick={() => {

                        let backendController = new BackendController();
                        let birthdatDate = new Date();
                        birthdatDate.setFullYear(Number(this.state.year.text), Number(this.state.month.text) + 1, Number(this.state.day.text));
                        let userJson = {
                            id: new Buffer(this.state.email.text).toString('base64'),
                            password: new Buffer(this.state.password.text).toString('base64'),
                            firstname: this.state.firstName.text,
                            lastname: this.state.lastName.text,
                            phone: this.state.phone.text,
                            birthday: birthdatDate,
                            gender: this.state.gender.text,

                        }

                        let returnUrl = this.state.forwarding;
                        if(!returnUrl)
                            returnUrl = "/";

                        backendController.requestRegisterUser(userJson)
                            .then((result) => {
                                window.alert("가입을 환영합니다");

                                var xhr = new XMLHttpRequest();
                                xhr.open("POST", Constants.backend + "/auth/login");
                                xhr.onload = function (event) {
                                    let response = JSON.parse(event.target.response);
                                    response = JSON.parse(response.body);
                                    var expireDate = Util.dateFromISO8601(response.expires_in);
                                    new AuthManager().setAuthInfo(response.user, response.access_token, response.refresh_token, expireDate);

                                    window.location.href = returnUrl;
                                };
                                xhr.setRequestHeader('Content-type', 'application/json')
                                xhr.send(JSON.stringify({
                                    username: new Buffer(this.state.email.text).toString('base64'),
                                    password: new Buffer(this.state.password.text).toString('base64')
                                }));
                            })
                            .catch((e) => {
                                window.alert("가입에 실패하였습니다. 관리자에게 문의하세요");
                                window.location.href = "/";
                            });

                    }} className="stepDiv">
                        동의
                    </div>
                </div>
            </div>
        )
    }
}

export default Registration;