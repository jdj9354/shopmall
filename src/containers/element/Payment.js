import './Payment.css'
import React, {Component} from 'react';
import TabComponent from "./TabComponent";

class Payment extends Component {
    render() {
        let tabItems = [
            {
                name: "Paypal",
                element: (
                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <input type="hidden" name="cmd" value="_s-xclick"/>
                        <input type="hidden" name="hosted_button_id" value="PHCR6TKAMANGG"/>
                        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
                               border="0"
                               name="submit" alt="PayPal - The safer, easier way to pay online!"/>
                        <img alt="" border="0" src="https://www.paypalobjects.com/ko_KR/i/scr/pixel.gif" width="1"
                             height="1"/>
                    </form>)
            },
            {
                name: "DepositlessPayment",
                element: (
                    <div>무통장입금</div>
                )
            }
        ]
        return (
            <div>
                <TabComponent tabItems={tabItems}/>
            </div>
        )
    }

}

export default Payment;
