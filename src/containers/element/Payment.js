import './Payment.css'
import React, {Component} from 'react';
import TabComponent from "./TabComponent";
import BackendController from "../../controller/BackendController";
import {backend, exposedAddr, exposedPort} from '../../Constants';
import {frontend} from '../../Constants';
import AuthManager from "../../auth/AuthManager";

let icon_paypal = require('../../res/icon_paypal.png');
let backendController = new BackendController();
let authManager = new AuthManager();

export const KRWtoUSDRatio = 0.0009;
export const KRWtoUSDFEERatio = 0.00368595041322314049586776859504;

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payerInfo: props.payerInfo,
            addressInfo: props.addressInfo,
            totalPrice: props.totalPrice,
            shippingFee: props.shippingFee,
            itemsArray: props.itemsArray
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            payerInfo: nextProps.payerInfo,
            addressInfo: nextProps.addressInfo,
            totalPrice: nextProps.totalPrice,
            itemsArray: nextProps.itemsArray
        })
    }

    render() {
        let tabItems = [
            {
                name: "Paypal",
                element: (
                    <div>
                        <form method="post" target="_top">
                            <input type="image" className="btnPaypalBuy" src={icon_paypal}
                                   border="0"
                                   name="submit" alt="Paypal" onClick={async (ev) => {
                                ev.preventDefault();

                                let order = {
                                    products: [],
                                    shippingFee: this.state.shippingFee,
                                    orderStatus: "created",
                                    orderDate: new Date()
                                };

                                this.state.itemsArray.map((item) => {
                                    order.products.push({
                                        productId: item._id,
                                        option: item.optionName,
                                        number: Number(item.num)
                                    })
                                });

                                let orderSaveResult = await backendController.saveOrder((await authManager.getAuthInfo()).user, order);
                                if (orderSaveResult) {

                                    let paypalAcccessToken = await backendController.getPaypalAccessToken();
                                    if (paypalAcccessToken) {
                                        let accessToken = paypalAcccessToken.access_token;

                                        let totalPriceInUsd = this.state.totalPrice * KRWtoUSDRatio;

                                        let exchangeFee = totalPriceInUsd * KRWtoUSDFEERatio;
                                        let finalUserPrice = totalPriceInUsd * totalPriceInUsd / (totalPriceInUsd + exchangeFee);
                                        finalUserPrice = Math.ceil(finalUserPrice * 100) / 100;

                                        let callPaypalRestApiParam = {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                                "Authorization": "Bearer " + accessToken
                                            },
                                            body: JSON.stringify({
                                                intent: "sale",
                                                redirect_urls: {
                                                    return_url: "http://" + exposedAddr + ":" + exposedPort + "/api/order/onPurchaseSuccessFromPayPal",
                                                    cancel_url: "http://" + exposedAddr + ":" + exposedPort + "/api/order/onPurchaseCancelFromPayPal"
                                                },
                                                payer: {
                                                    payment_method: "paypal",
                                                    payer_info: {
                                                        email: this.state.payerInfo.email

                                                    }
                                                },
                                                transactions: [{
                                                    amount: {
                                                        total: finalUserPrice,
                                                        currency: "USD"
                                                    }
                                                }],
                                                application_context: {
                                                    brand_name: "URtheOnly1",
                                                    landing_page: "Billing",
                                                    locale: "KR",
                                                    shipping_preference: "NO_SHIPPING",
                                                    user_action: "commit"
                                                }
                                            })
                                        };
                                        let callPaypalRestApi = await fetch("https://api.sandbox.paypal.com/v1/payments/payment", callPaypalRestApiParam);
                                        let jsonResult = await callPaypalRestApi.json();
                                        let links = (jsonResult).links;

                                        if (callPaypalRestApi) {
                                            if (links) {
                                                let id = jsonResult.id;
                                                let state = jsonResult.state;
                                                let createTime = new Date(jsonResult.create_time);
                                                let orderItems = this.state.itemsArray;
                                                let payer = authManager.getAuthInfo().user;

                                                let requestParam = {
                                                    id: id,
                                                    state: state,
                                                    createTime: createTime,
                                                    orderItems: orderItems,
                                                    relOrderId: orderSaveResult.orderId,
                                                    payer: payer
                                                }

                                                let requestResult = await backendController.requestAPI('/api/order/onPurchaseRequestFromPayPal', requestParam, "POST");
                                                if (requestResult.status == 200) {
                                                    //requestResult = await requestResult.json();
                                                    links.map((link) => {
                                                        if (link.method == "REDIRECT" && link.rel == "approval_url")
                                                            window.location.href = link.href;
                                                    });
                                                } else {
                                                    window.alert("페이팔 연동에 실패하였습니다");
                                                }
                                            } else {
                                                window.alert("페이팔 연동에 실패하였습니다");
                                            }
                                        } else {
                                            window.alert("페이팔 연동에 실패하였습니다");
                                        }
                                    } else {
                                        window.alert("페이팔 연동에 실패하였습니다");
                                    }
                                } else {
                                    window.alert("주문 정보 생성에 실패하였습니다")
                                }
                            }

                            }/>

                        </form>
                        Paypal 결제
                    </div>)
            },
            {
                name: "DepositlessPayment",
                element: (
                    <div>무통장입금</div>
                )
            }
        ]
        return (
            <div className="Payment">
                <TabComponent tabItems={tabItems}/>
            </div>
        )
    }

}

export default Payment;
