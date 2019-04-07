import React, {Component} from 'react';
import './MyPageLayout.css';
import AuthManager from "../../auth/AuthManager";

let authManager = new AuthManager();

class MyPageLayout extends Component {
    async componentDidMount() {
        await authManager.init();
    }

    render() {
        return (
            <div className="MyPageLayout">
                <div>
                    <a className="on_toggle" onClick={async () => {
                        await authManager.clearAuthInfo();
                        window.location.href = "/";
                    }}>로그 아웃</a>
                </div>
                <div>
                    <a className="on_toggle" onClick={() => {
                        window.location.href = "/updateInformation";
                    }}>내 정보 수정</a>
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