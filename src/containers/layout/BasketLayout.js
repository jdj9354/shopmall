import React, {Component} from 'react';
import Process from '../element/Process.js'
import './BasketLayout.css';
import BasketController from "../../controller/BasketController";
import BackendController from "../../controller/BackendController";
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import AuthManager from "../../auth/AuthManager";

let beController = new BackendController();

class BasketLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            basketItemsArray: [],
            totalPrice: 0
        };
    }

    async componentWillMount() {
        let basketItemsArray = [];

        let basketItems = await new BasketController().getBasketItems();
        if(basketItems == null)
            return;
        let loadCount = 0;
        let totalPrice = this.state.totalPrice;
        basketItems.map(async (el) => {
            let product = await beController.getItem(el.id);
            if(product == null) {
                loadCount++;
                return;
            }
            product.optionName = el.optionName;
            product.num = el.num;
            basketItemsArray.push(product);

            loadCount++;

            if (loadCount == basketItems.length) {
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
                isStepOn: true
            },
            {
                text: "STEP02 주문/결제",
                isStepOn: false
            },
            {
                text: "STEP03 주문완료",
                isStepOn: false
            }
        ];


        return (
            <div>
                <div class="main_basket_contents">
                    <Process items={items}></Process>
                    <br></br>
                    <h3>C A R T</h3>
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
                                <input onChange={(e) => {
                                    let checkboxes = document.getElementsByClassName('item_checkbox');
                                    if (e.target.checked) {
                                        for (let i = 0; i < checkboxes.length; i++) {
                                            checkboxes[i].checked = true;
                                        }
                                    } else {
                                        for (let i = 0; i < checkboxes.length; i++) {
                                            checkboxes[i].checked = false;
                                        }
                                    }

                                    let totalPrice = this.getTotalPrice();
                                    this.setState({
                                        totalPrice: totalPrice
                                    });
                                }} type="checkbox" defaultChecked={true}/>
                            </th>
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
                            <th scope="col">
                                <div className="tb-center">배송비</div>
                            </th>
                            <th scope="col">
                                <div className="tb-center">취소</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.basketItemsArray.map((el) => {
                                return (
                                    <tr class="basket_item" data-id={el._id} data-option_name={el.optionName}>
                                        <td>
                                            <input class="item_checkbox" onChange={(e) => {
                                                let totalPrice = this.getTotalPrice();
                                                this.setState({
                                                    totalPrice: totalPrice
                                                });
                                            }} type="checkbox" defaultChecked={true}/>
                                        </td>
                                        <td className="thumbNailImageCol">
                                            <img src={el.thumbnailImageSrc}/>
                                        </td>
                                        <td>
                                            {el.name} / {el._id} / {el.optionName}
                                        </td>
                                        <td>
                                            <input class="item_number" type="number"
                                                   value={el.num}
                                                   onInput={(node) => {
                                                       if (node.target.value <= 0) {
                                                           window.alert("1개 이상의 수량을 지정하여야 합니다");
                                                           node.target.value = 1;
                                                       }
                                                       let stateUpdate = {};
                                                       let rowNode = node.target.parentElement.parentElement;
                                                       for (let i = 0; i < this.state.basketItemsArray.length; i++) {
                                                           let basketItem = this.state.basketItemsArray[i];
                                                           if (basketItem._id == rowNode.dataset.id && basketItem.optionName == rowNode.dataset.option_name) {
                                                               basketItem.num = node.target.value;
                                                           }
                                                       }
                                                       stateUpdate.basketItemsArray = this.state.basketItemsArray;
                                                       stateUpdate.totalPrice = this.state.totalPrice;
                                                       this.setState(stateUpdate, () => {
                                                           let totalPrice = this.getTotalPrice();
                                                           this.setState({
                                                               basketItemsArray: this.state.basketItemsArray,
                                                               totalPrice: totalPrice
                                                           });
                                                       });

                                                   }
                                                   }/>
                                        </td>
                                        <td>
                                            0
                                        </td>
                                        <td>
                                            {this.getProductPrice(el)} {el.priceUnit}
                                        </td>
                                        <td>
                                            [기본배송] 조건
                                        </td>
                                        <td>
                                            <div class="item_delete" onClick={async (el) => {
                                                await new BasketController().removeBasketItem(el.target.parentElement.parentElement.dataset.id, el.target.parentElement.parentElement.dataset.option_name);
                                                window.location.href = "/cart/";
                                            }}>삭제
                                            </div>
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
                    <div className="basketBottom">
							<span className="left">
								<a class="toggle_on" href="/">쇼핑 계속하기</a>
							</span>
                        <span class="right">
                                <ul>
                                    <li>
                                        <a className="toggle_off" onClick={async (el) => {
                                            await new BasketController().emptyBasket();
                                            window.location.href = "/";
                                        }}>장바구니 비우기</a>
                                    </li>
                                    <li>
                                        <a className="toggle_off" onClick={async (el) => {
                                            let checkboxes = document.getElementsByClassName('item_checkbox');

                                            for (let i = 0; i < checkboxes.length; i++) {
                                                if (checkboxes[i].checked) {
                                                    await new BasketController().removeBasketItem(checkboxes[i].parentElement.parentElement.dataset.id, checkboxes[i].parentElement.parentElement.dataset.option_name);
                                                }
                                            }

                                            if (await new BasketController().getBasketItems().length == 0)
                                                window.location.href = "/";
                                            else
                                                window.location.href = "/cart";

                                        }}>선택상품 삭제</a>
                                    </li>
                                    <li>
                                        <Link className="toggle_off" onClick={(ev) => {
                                            if (this.state.finalSelectedItemsArray.length == 0) {
                                                window.alert("1개 이상의 상품을 선택해야 합니다.");
                                                ev.preventDefault();

                                            }
                                            localStorage.setItem("lastBasketItem", JSON.stringify(this.getFinalSelectedItem()));

                                        }} exact to={{pathname: "/order", itemsArray: this.getFinalSelectedItem()}}> 선택상품 주문</Link>
                                    </li>
                                    <li>
                                        <Link className="toggle_on" onClick={(ev) => {
                                            localStorage.setItem("lastBasketItem", JSON.stringify(this.state.basketItemsArray));

                                        }} exact to={{pathname: "/order", itemsArray: this.state.basketItemsArray}}> 전체상품 주문</Link>
                                    </li>
                                </ul>
							</span>
                    </div>
                </div>
            </div>
        )
    }

    getFinalSelectedItem() {
        let checkboxes = document.getElementsByClassName('item_checkbox');
        this.state.finalSelectedItemsArray = [];

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                let targetItem = null;
                for (let j = 0; j < this.state.basketItemsArray.length; j++) {
                    if (this.state.basketItemsArray[j]._id == checkboxes[i].parentElement.parentElement.dataset.id
                        && this.state.basketItemsArray[j].optionName == checkboxes[i].parentElement.parentElement.dataset.option_name) {
                        targetItem = this.state.basketItemsArray[j];
                        break;
                    }
                }
                if (targetItem != null)
                    this.state.finalSelectedItemsArray.push(targetItem);
            }
        }
        return this.state.finalSelectedItemsArray;
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
        let checkboxes = document.getElementsByClassName('item_checkbox');
        let totalPrice = 0;
        let curItemPrice = 0;
        let basketItemArray = this.state.basketItemsArray;
        for (let i = 0; i < basketItemArray.length; i++) {
            if (checkboxes[i].checked) {
                curItemPrice = 0;
                curItemPrice += parseInt(basketItemArray[i].price);
                for (let option in basketItemArray[i].options) {
                    if (basketItemArray[i].options[option].name == checkboxes[i].parentElement.parentElement.dataset.option_name) {
                        curItemPrice += parseInt(basketItemArray[i].options[option].priceChange);
                        curItemPrice *= parseInt(basketItemArray[i].num);
                        break;
                    }
                }
                totalPrice += curItemPrice;
            }
        }
        return totalPrice;
    }
}

export default BasketLayout;