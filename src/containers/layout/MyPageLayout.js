import React, {Component} from 'react';
import './MyPageLayout.css';
import AuthManager from "../../auth/AuthManager";

class MyPageLayout extends Component {
    render() {
        return (
            <div className="MyPageLayout">
                <div>
                    <a className="on_toggle" onClick={async () => {
                        let authManager = new AuthManager();
                        authManager.deleteCookie("access_token");
                        authManager.deleteCookie("refresh_token");
                        window.location.href = "/";
                    }}>로그 아웃</a>
                </div>
                <div>
                    <a className="on_toggle" onClick={() => {
                        window.location.href = "/purchaseList";
                    }}>구매 내역</a>
                </div>
            </div>
        )
    }
}

export default MyPageLayout;