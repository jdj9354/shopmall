import React, {Component} from 'react';
import '../element/DatePicker';
import './PurchaseLayout.css';


import DatePicker from "../element/DatePicker";
import BackendController from "../../controller/BackendController";
import AuthManager from "../../auth/AuthManager";

let backendController = new BackendController();
let authManager = new AuthManager();

class PurchaseLayout extends Component {

    constructor(props) {
        super(props);

        let today = new Date();
        let oneMontLater = this.addMonths(new Date(), 1);

        this.state = {
            start: {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate()
            },
            end: {
                year: oneMontLater.getFullYear(),
                month: oneMontLater.getMonth() + 1,
                day: oneMontLater.getDate()
            },
            page: 1,
            pageLimit: 10,
            orderList: [],
            totalPage: 1
        };
        this.requestOrderList(1);

    }

    addMonths(date, n) {
        return new Date(date.setMonth(date.getMonth() + n));
    }

    addDays(date, n) {
        return new Date(date.setDate(date.getDate() + n));
    }

    checkDateValidity(startYear, startMonth, startDay, endYear, endMonth, endDay) {
        let startDate = new Date(startYear, startMonth - 1, startDay);
        let endDate = new Date(endYear, endMonth - 1, endDay);
        if (startDate > endDate)
            return false;
        else
            return true;
    }

    updateDateStateFromDatePicker() {
        this.state.start = {
            year: window.startDatePicker.getYear(),
            month: window.startDatePicker.getMonth(),
            day: window.startDatePicker.getDay()
        }
        this.state.end = {
            year: window.endDatePicker.getYear(),
            month: window.endDatePicker.getMonth(),
            day: window.endDatePicker.getDay()
        }
    }

    async requestOrderList(page) {
        let userInfo = await authManager.getAuthInfo();
        let userId = userInfo.user;
        let requestResult = await backendController.getOrderList(userId,
            {
                year: this.state.start.year,
                month: this.state.start.month,
                day: this.state.start.day
            },
            {
                year: this.state.end.year,
                month: this.state.end.month,
                day: this.state.end.day
            },
            page,
            this.state.pageLimit);

        if(requestResult != null) {

            this.setState({
                orderList: requestResult.docs,
                page: page,
                totalPage: requestResult.pages
            })
        }
    }

    render() {
        let pageStart = Math.floor(this.state.page / 10) * 10 + 1
        let pageEnd = pageStart + 9 >= this.state.totalPage ? this.state.totalPage : pageStart + 9;
        let pageTailText = [];
        for (let i = pageStart; i <= pageEnd; i++) {
            pageTailText.push(i);
        }

        let count = 0;

        return (
            <div className='PurchaseLayout'>
                <div className="purchaseList">
                    <div>조회기간</div>
                    <div className="periodShortcut">
                        <div onClick={() => {
                            let today = new Date();
                            window.startDatePicker.setDate(today);
                            window.endDatePicker.setDate(today);
                            this.updateDateStateFromDatePicker();
                        }}>오늘
                        </div>
                        <div onClick={() => {
                            let today = new Date();
                            window.startDatePicker.setDate(today);
                            window.endDatePicker.setDate(this.addDays(today, 7));
                            this.updateDateStateFromDatePicker();
                        }}>1주일
                        </div>
                        <div onClick={() => {
                            let today = new Date();
                            window.startDatePicker.setDate(today);
                            window.endDatePicker.setDate(this.addMonths(today, 1));
                            this.updateDateStateFromDatePicker();
                        }}>1개월
                        </div>
                        <div onClick={() => {
                            let today = new Date();
                            window.startDatePicker.setDate(today);
                            window.endDatePicker.setDate(this.addMonths(today, 6));
                            this.updateDateStateFromDatePicker();
                        }}>6개월
                        </div>
                    </div>
                    <div className="periodPicker">
                        <DatePicker maxYear={5} ref={(startDatePicker) => {
                            if (window.startDatePicker)
                                return;
                            window.startDatePicker = startDatePicker;
                        }} onChange={(year, month, day) => {
                            this.state.start.year = year;
                            this.state.start.month = month;
                            this.state.start.day = day;
                        }}/>
                        <div id="periodIndicator"> ~</div>
                        <DatePicker maxYear={5} ref={(endDatePicker) => {
                            if (window.endDatePicker)
                                return;
                            window.endDatePicker = endDatePicker;
                            if (window.startDatePicker) {
                                let startDate = window.startDatePicker.getDate();
                                let oneMonthLater = this.addMonths(startDate, 1);
                                window.endDatePicker.setDate(oneMonthLater);
                            }
                        }} onChange={(year, month, day) => {
                            this.state.end.year = year;
                            this.state.end.month = month;
                            this.state.end.day = day;
                        }}/>
                        <div id="searchButton" onClick={() => {
                            if (!this.checkDateValidity(this.state.start.year,
                                this.state.start.month,
                                this.state.start.day,
                                this.state.end.year,
                                this.state.end.month,
                                this.state.end.day)) {
                                window.alert("시작 날짜는 종료 날짜 보다 클 수 없습니다.")
                                return;
                            }
                            this.requestOrderList(1);
                        }}>검색
                        </div>
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
                        {
                            this.state.orderList.map((el) => {
                                let isFirst = true;
                                let dateObj = new Date(el.orderDate);
                                let dateString = dateObj.getFullYear() + "년 " + (dateObj.getMonth() + 1) + "월 " + dateObj.getDate() + "일";
                                return (
                                    el.products.map((product) => {
                                        let productPrice = product.detail.price;
                                        product.detail.options.forEach((optionElem) => {
                                            if (optionElem.name == product.option) {
                                                productPrice += optionElem.priceChange;
                                            }
                                        });
                                        if (isFirst) {
                                            isFirst = false;
                                            return (
                                                <tr>
                                                    <td rowSpan={el.products.length}>
                                                        <div>{dateString}</div>
                                                    </td>
                                                    <td><img src={product.detail.thumbnailImageSrc} align="middle"/>
                                                        {product.detail.name} / {product.option}
                                                    </td>
                                                    <td>
                                                        <div>{productPrice} {product.detail.priceUnit} ({product.number})</div>
                                                    </td>
                                                    <td rowSpan={el.products.length}>
                                                        <div>{el.shippingFee}</div>
                                                    </td>
                                                    <td rowSpan={el.products.length}>
                                                        <div>{el.orderStatus}</div>
                                                    </td>
                                                </tr>
                                            )
                                        } else {
                                            return (
                                                <tr>
                                                    <td><img src={product.detail.thumbnailImageSrc} align="middle"/>
                                                        {product.detail.name} / {product.option}
                                                    </td>
                                                    <td>
                                                        <div>{productPrice} {product.detail.priceUnit} ({product.number})</div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })
                                )
                            })
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="5">
                                <div className="footerWrapper">
                                    {
                                        <div className="arrow arrow-left" onClick={(event) => {
                                            let targetIdx = Math.floor(this.state.page / 10) * 10;
                                            if (targetIdx <= 1)
                                                targetIdx = 1;
                                            this.requestOrderList(targetIdx)
                                        }
                                        }></div>
                                    }
                                    <div>
                                        {
                                            pageTailText.map((text) => {
                                                if (++count == this.state.page)
                                                    return (
                                                        <div className="selected"><strong>{text}</strong></div>
                                                    )
                                                else {
                                                    return (
                                                        <div onClick={(event) => {
                                                            this.requestOrderList(event.target.innerText)
                                                        }
                                                        }>{text}</div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                    {
                                        <div className="arrow arrow-right" onClick={(event) => {
                                            let targetIdx = (Math.floor(this.state.page / 10) + 1) * 10;
                                            if (targetIdx >= this.state.totalPage)
                                                targetIdx = this.state.totalPage;
                                            this.requestOrderList(targetIdx)
                                        }}></div>
                                    }
                                </div>
                            </td>
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
