import React, {Component} from 'react';
import './AuthBeforePurchase.css';
import Login from '../layout/login/Login';
import {Link} from "react-router-dom";
import BasketController from "../../controller/BasketController";


class AuthBeforePurchase extends Component {
    render() {
        return (
            <div className="AuthBeforePurchase">
                <Login forwarding="/order"  onLoginSuccess={async () => {
                    let basketController = new BasketController();
                    await basketController.overrideAsGuestBasket();
                }}></Login>
                <div className="NoMemPurchase">
                    <Link exact to={{pathname: "/order", noMemPurchase: true}}>비회원 주문</Link>
                </div>
            </div>
        );
    }
}

export default AuthBeforePurchase;