import React, {Component} from 'react';
import './UpdateInformationLayout.css';

class UpdateInformationLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            forwarding: props.forwarding,
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
    }

    handleChange = event => {

        //Check Validity
        if (event.target.id == "password") {
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
            <div className="UpdateInformationLayout">
                <form onSubmit={this.handleSubmit}>
                    <div className="authField">
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
                        <div className="controlButton">
                            <div className="confirm">
                                <a onClick={() => {
                                    let isAllValid = true;

                                    for (let [key, value] of Object.entries(this.state)) {
                                        if (!value)
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
                                    }
                                }} className="on_toggle">확인</a>
                            </div>
                            <div className="cancel">
                                <a onClick={() => {
                                    let isAllValid = true;

                                    for (let [key, value] of Object.entries(this.state)) {
                                        if (!value)
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
                                    }
                                }} className="on_toggle">취소</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default UpdateInformationLayout;
