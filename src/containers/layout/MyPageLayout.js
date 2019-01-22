import React, {Component} from 'react';
import './MyPageLayout.css';

class MyPageLayout extends Component{
    render() {
        return(
            <div className="MyPageLayout">
                <div>
                    <a className="on_toggle" href="/registration">로그 아웃</a>
                </div>
            </div>
        )
    }
}

export default MyPageLayout;