import React, {Component} from 'react';
import Process from '../element/Process.js'
import './BasketLayout.css';
import BasketController from "../../controller/BasketController";
import BackendController from "../../controller/BackendController";

let beController = new BackendController();

class BasketLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            basketItemsArray: [],
            numInfo: {},
            totalPrice: 0
        };
    }

    componentWillMount() {
        let basketItemsArray = [];

        let basketItems = new BasketController().getBasketItems();
        let numInfo = {};
        let priceInfo = {};
        let loadCount = 0;
        let totalPrice = this.state.totalPrice;
        basketItems.map(async (el) => {
            let product = await beController.getItem(el.id);
            product.optionName = el.optionName;

            basketItemsArray.push(product);

            if (!numInfo[el.id])
                numInfo[el.id] = {};
            numInfo[el.id][el.optionName] = el.num;

            loadCount++;

            if (loadCount == basketItems.length) {
                loadCount = 0;
                this.state.basketItemsArray = basketItemsArray;
                this.state.numInfo = numInfo;
                this.setState({
                    basketItemsArray: basketItemsArray,
                    numInfo: numInfo,
                    totalPrice:totalPrice
                },() => {
                    totalPrice = this.getTotalPrice();
                    this.setState({
                        basketItemsArray: basketItemsArray,
                        numInfo : this.state.numInfo,
                        totalPrice:totalPrice
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
                                        totalPrice:totalPrice
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
                                            <input class="item_checkbox" onChange={(e)=> {
                                                let totalPrice = this.getTotalPrice();
                                                this.setState({
                                                    totalPrice:totalPrice
                                                });
                                            }} type="checkbox" defaultChecked={true}/>
                                        </td>
                                        <td>
                                            <img src={el.thumbnailImageSrc}/>
                                        </td>
                                        <td>
                                            {el.name} / {el._id} / {el.optionName}
                                        </td>
                                        <td>
                                            <input class="item_number" type="number"
                                                   value={this.state.numInfo[el._id][el.optionName]}
                                                   onInput={(node) => {
                                                       if (node.target.value <= 0) {
                                                           window.alert("1개 이상의 수량을 지정하여야 합니다");
                                                           node.target.value = 1;
                                                       }
                                                       let stateUpdate = {};
                                                       stateUpdate.numInfo = this.state.numInfo;
                                                       let rowNode = node.target.parentElement.parentElement;
                                                       stateUpdate.numInfo[rowNode.dataset.id][rowNode.dataset.option_name] = node.target.value;
                                                       stateUpdate.basketItemsArray = this.state.basketItemsArray;
                                                       stateUpdate.totalPrice = this.state.totalPrice;
                                                       console.log(stateUpdate);
                                                       this.setState(stateUpdate, () => {
                                                           let totalPrice = this.getTotalPrice();
                                                           this.setState({
                                                               basketItemsArray : this.state.basketItemsArray,
                                                               numInfo : this.state.numInfo,
                                                               totalPrice:totalPrice
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
                                    <div class="item_delete" onClick={(el) => {
                                        new BasketController().removeBasketItem(el.target.parentElement.parentElement.dataset.id, el.target.parentElement.parentElement.dataset.option_name);
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
                                        <a className="toggle_off" onClick={(el) => {
                                            new BasketController().emptyBasket();
                                            window.location.href = "/";
                                        }}>장바구니 비우기</a>
                                    </li>
                                    <li>
                                        <a className="toggle_off" onClick={(el) => {
                                            let checkboxes = document.getElementsByClassName('item_checkbox');

                                            for (let i = 0; i < checkboxes.length; i++) {
                                                if (checkboxes[i].checked) {
                                                    console.log(checkboxes[i].parentElement.parentElement.id);
                                                    new BasketController().removeBasketItem(checkboxes[i].parentElement.parentElement.dataset.id, checkboxes[i].parentElement.parentElement.dataset.option_name);
                                                }
                                            }

                                            if (new BasketController().getBasketItems().length == 0)
                                                window.location.href = "/";
                                            else
                                                window.location.href = "/cart";

                                        }}>선택상품 삭제</a>
                                    </li>
                                    <li>
                                        <a className="toggle_off">선택상품 주문</a>
                                    </li>
                                    <li>
                                        <a className="toggle_on"> 전체상품 주문</a>
                                    </li>
                                </ul>
							</span>
                    </div>
                </div>
            </div>
        )
    }

    getProductPrice(product){
        let optionPrice = 0;

        for(let option in product.options){
            console.log(option)
            if(product.options[option].name == product.optionName){
                optionPrice += parseInt(product.options[option].priceChange);
            }
        }
        return parseInt(product.price) + optionPrice;
    }

    getTotalPrice(){
        let checkboxes = document.getElementsByClassName('item_checkbox');
        let totalPrice = 0;
        let curItemPrice = 0;
        let basketItemArray = this.state.basketItemsArray;
        for (let i = 0; i < basketItemArray.length; i++) {
            if (checkboxes[i].checked) {
                curItemPrice = 0;
                curItemPrice += parseInt(basketItemArray[i].price);
                for(let option in basketItemArray[i].options){
                    if(basketItemArray[i].options[option].name == checkboxes[i].parentElement.parentElement.dataset.option_name){
                        curItemPrice += parseInt(basketItemArray[i].options[option].priceChange);
                        curItemPrice *= parseInt(this.state.numInfo[basketItemArray[i]._id][basketItemArray[i].options[option].name]);
                        break;
                    }
                }
                console.log(curItemPrice)
                totalPrice += curItemPrice;
            }
        }
        return totalPrice;
    }
}

export default BasketLayout;