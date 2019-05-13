import React, {Component} from 'react';
import Popup from 'react-popup';
import QnALayout from "../layout/QnALayout";
import './QnAPopup.css';

class QnAPopup extends Component {

    render() {
        return (
            <div className="QnAPopup">
                <QnALayout/>
            </div>
        );
    }
}

export default QnAPopup;