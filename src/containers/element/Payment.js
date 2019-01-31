import './Payment.css'
import React, {Component} from 'react';
import TabComponent from "./TabComponent";

let icon_paypal = require('../../res/icon_paypal.png');

class Payment extends Component {
    render() {
        let tabItems = [
            {
                name: "Paypal",
                element: (
                    <div>
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                            <input type="hidden" name="cmd" value="_s-xclick"/>
                            <input type="hidden" name="hosted_button_id" value="PHCR6TKAMANGG"/>
                            <input type="hidden" name="currency_code" value="USD"/>
                            <input type="image" className="btnPaypalBuy" src={icon_paypal}
                                   border="0"
                                   name="submit" alt="Paypal"/>

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
