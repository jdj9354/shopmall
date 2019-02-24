import React, {Component} from 'react';
import './OrderLayout.css';
import Process from "../element/Process";
import Payment from "../element/Payment";
import BackendController from "../../controller/BackendController";
import AuthManager from "../../auth/AuthManager";
import {Redirect} from "react-router-dom";

let beController = new BackendController();

class OrderLayout extends Component {

    constructor(props) {
        super(props);

        let itemsArray;
        if (!props.itemsArray) {
            itemsArray = JSON.parse(localStorage.getItem("lastBasketItem"));
            if (!itemsArray)
                itemsArray = [];
        } else
            itemsArray = props.itemsArray

        this.state = {
            payerInfo: {},
            addressInfo: {},
            itemsArray: itemsArray,
            totalPrice: 0
        };
    }

    componentWillMount() {
        let basketItemsArray = [];

        let itemsArray = this.state.itemsArray;
        let loadCount = 0;
        let totalPrice = this.state.totalPrice;
        itemsArray.map(async (el) => {
            let product = await beController.getItem(el._id);
            product.optionName = el.optionName;

            basketItemsArray.push(product);

            product.num = el.num;

            loadCount++;

            if (loadCount == itemsArray.length) {
                loadCount = 0;
                this.state.basketItemsArray = basketItemsArray;
                this.setState({
                    basketItemsArray: basketItemsArray,
                    totalPrice: totalPrice
                }, () => {
                    totalPrice = this.getTotalPrice();
                    this.setState({
                        basketItemsArray: basketItemsArray,
                        totalPrice: totalPrice
                    });
                });

            }
        });
    }


    render() {
        let items = [
            {
                text: "STEP01 장바구니",
                isStepOn: false
            },
            {
                text: "STEP02 주문/결제",
                isStepOn: true
            },
            {
                text: "STEP03 주문완료",
                isStepOn: false
            }
        ];
        return (
            <div>
                <div className="orderMainLayout">
                    <Process items={items}></Process>
                    <br></br>
                    <h3>O R D E R</h3>
                    <br></br>
                    <table id="cart_table" summary="번호, 사진, 제품명, 수량, 적립, 가격, 배송비, 취소">
                        <colgroup>
                            <col width="5%"/>
                            <col width="10%"/>
                            <col width="*"/>
                            <col width="10%"/>
                            <col width="10%"/>
                            <col width="10%"/>
                            <col width="10%"/>
                            <col width="10%"/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="col">
                                <div className="tb-center">이미지</div>
                            </th>
                            <th scope="col">
                                <div className="tb-center">상품명</div>
                            </th>
                            <th scope="col">
                                <div className="tb-center">수량</div>
                            </th>
                            <th scope="col">
                                <div className="tb-center">적립금</div>
                            </th>
                            <th scope="col">
                                <div className="tb-center">판매가</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.itemsArray.map((el) => {
                                return (
                                    <tr className="basket_item" data-id={el._id} data-option_name={el.optionName}>
                                        <td className="thumbNailImageCol">
                                            <img src={el.thumbnailImageSrc}/>
                                        </td>
                                        <td>
                                            {el.name} / {el._id} / {el.optionName}
                                        </td>
                                        <td>
                                            {el.num}
                                        </td>
                                        <td>
                                            0
                                        </td>
                                        <td>
                                            {this.getProductPrice(el)} {el.priceUnit}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="8">
                                <div id="totalPrice">
                                    총 구매금액 : <strong>{this.state.totalPrice}</strong> 원
                                </div>
                            </td>
                        </tr>
                        </tfoot>
                        <tbody>
                        </tbody>
                    </table>
                    <br></br>
                    <h3>주문자 정보 입력</h3>
                    <br></br>
                    <div className="orderManInfo">
                        <table className="orderManInfoTable">
                            <colgroup>
                                <col/>
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th scope="row">주문자 정보</th>
                                <td className="buyerInfoInput">
                                    <input type="text"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label>휴대전화</label>
                                </th>
                                <td className="phoneNumberInput">
                                    <select>
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                        <option value="017">017</option>
                                        <option value="018">018</option>
                                        <option value="019">019</option>
                                    </select>&nbsp;-&nbsp;
                                    <input maxLength="4" type="text"/>&nbsp;-&nbsp;
                                    <input maxLength="4" type="text"/>
                                </td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <label>이메일</label>
                                </th>
                                <td className="emailInput">
                                    <input type="text"/>&nbsp;@&nbsp;
                                    <input maxLength="40" type="text"/>
                                    <select>
                                        <option value="01">직접입력</option>
                                        <option value="02">naver.com</option>
                                        <option value="03">hanmail.net</option>
                                        <option value="05">nate.com</option>
                                        <option value="06">yahoo.co.kr</option>
                                        <option value="12">gmail.com</option>
                                        <option value="15">daum.net</option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    <h3>배송지 정보 입력</h3>
                    <br></br>
                    <div className="orderLocationInfo">
                        <table className="orderLocationInfoTable">
                            <colgroup>
                                <col/>
                                <col/>
                            </colgroup>
                            <tbody>
                            <tr>
                                <th scope="row">받으시는 분</th>
                                <td className="recipientInfoInput">
                                    <input type="text"/>
                                </td>
                            </tr>
                            <tr>
                                <th className="addressHead" scope="row">
                                    <lable>주소</lable>
                                </th>
                                <td className="locationInput">
                                    <input className="normalLine" type="text" maxLength="6" readonly=""/>
                                    <a className="normalLine">주소찾기</a>
                                    <input className="blockLine" type="text" maxLength="200" readonly=""/>
                                    <input className="blockLine" type="text" maxLength="200"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label>휴대전화</label>
                                </th>
                                <td className="phoneNumberInput">
                                    <select>
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                        <option value="017">017</option>
                                        <option value="018">018</option>
                                        <option value="019">019</option>
                                    </select>&nbsp;-&nbsp;
                                    <input maxLength="4" type="text"/>&nbsp;-&nbsp;
                                    <input maxLength="4" type="text"/>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label>배송시요구사항</label>
                                </th>
                                <td className="sendingRequirement">
                                    <select>
                                        <option></option>
                                        <option>배송 전 연락바랍니다.</option>
                                        <option>파손위험이 있는 상품이니 조심히 다뤄주세요.</option>
                                        <option>부재시 경비실에 맡겨주세요.</option>
                                        <option>부재시 문앞에 놓아주세요.</option>
                                        <option>부재시 휴대폰으로 연락주세요.</option>
                                        <option>문앞에 놓아주세요.</option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    <h3>결제 방법 선택</h3>
                    <br></br>
                    <div>
                        <Payment payerInfo={this.state.payerInfo} addressInfo={this.state.addressInfo}
                                 shippingFee={{price:5000,priceUnit:"원"}} totalPrice={this.state.totalPrice}
                                 itemsArray={this.state.itemsArray}/>
                    </div>
                </div>
            </div>
        );
    }

    getProductPrice(product) {
        let optionPrice = 0;

        for (let option in product.options) {
            if (product.options[option].name == product.optionName) {
                optionPrice += parseInt(product.options[option].priceChange);
            }
        }
        return parseInt(product.price) + optionPrice;
    }

    getTotalPrice() {
        let totalPrice = 0;
        let curItemPrice = 0;
        let basketItemArray = this.state.basketItemsArray;
        for (let i = 0; i < basketItemArray.length; i++) {
            curItemPrice = 0;
            curItemPrice += parseInt(basketItemArray[i].price);
            for (let option in basketItemArray[i].options) {
                if (basketItemArray[i].options[option].name == basketItemArray[i].optionName) {
                    curItemPrice += parseInt(basketItemArray[i].options[option].priceChange);
                    curItemPrice *= parseInt(basketItemArray[i].num);
                    break;
                }
            }
            totalPrice += curItemPrice;
        }
        return totalPrice;
    }
}

export default OrderLayout;