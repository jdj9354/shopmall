import React, {Component} from 'react';
import '../element/DatePicker';
import './PurchaseLayout.css';
import DatePicker from "../element/DatePicker";

class PurchaseLayout extends Component {

    addMonths(date, n) {
        return new Date(date.setMonth(date.getMonth() + n));
    }

    addDays(date, n) {
        return new Date(date.setDate(date.getDate() + n));
    }

    render() {
        return (
            <div className='PurchaseLayout'>
                <div className="purchaseList">
                    <div>조회기간</div>
                    <div className="periodShortcut">
                        <div onClick={() => {
                            let today = new Date();
                            window.startDatePicker.setDate(today);
                            window.endDatePicker.setDate(today);
                        }}>오늘
                        </div>
                        <div onClick={() => {
                            let today = new Date();
                            window.startDatePicker.setDate(today);
                            window.endDatePicker.setDate(this.addDays(today, 7));
                        }}>1주일
                        </div>
                        <div onClick={() => {
                            let today = new Date();
                            window.startDatePicker.setDate(today);
                            window.endDatePicker.setDate(this.addMonths(today, 1));
                        }}>1개월
                        </div>
                        <div onClick={() => {
                            let today = new Date();
                            window.startDatePicker.setDate(today);
                            window.endDatePicker.setDate(this.addMonths(today, 6));
                        }}>6개월
                        </div>
                    </div>
                    <div className="periodPicker">
                        <DatePicker maxYear={5} ref={(startDatePicker) => {
                            window.startDatePicker = startDatePicker;
                        }}/>
                        <div id="periodIndicator"> ~</div>
                        <DatePicker maxYear={5} ref={(endDatePicker) => {
                            window.endDatePicker = endDatePicker;
                            let startDate = new Date(window.startDatePicker.getYear(), window.startDatePicker.getMonth()-1, window.startDatePicker.getDay());
                            let oneMonthLater = this.addMonths(startDate, 1);
                            window.endDatePicker.setDate(oneMonthLater);
                        }}/>
                    </div>
                    <table id="purchaseListTable" summary="주문일자, 주문 상품 정보, 상품금액(수량), 배송비, 주문상태">
                        <colgroup>
                            <col width="10%"/>
                            <col width="*"/>
                            <col width="15%"/>
                            <col width="15%"/>
                            <col width="15%"/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="col">
                                <div className="tb-center">주문일자</div>
                            </th>
                            <th scope="col">
                                <div className="tb-center">주문 상품 정보</div>
                            </th>
                            <th scope="col">
                                <div className="tb-center">상품금액(수량)</div>
                            </th>
                            <th scope="col">
                                <div className="tb-center">배송비</div>
                            </th>
                            <th scope="col">
                                <div className="tb-center">주문상태</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        <tfoot>
                        <tr>
                            //Paging
                        </tr>
                        </tfoot>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>);
    }
}

export default PurchaseLayout;
