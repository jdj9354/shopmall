import React, {Component} from 'react';
import './DetailLayout.css';
import * as Constants from '../../Constants.js';
import SelectBox from '../element/SelectBox';
import request from 'superagent'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import "react-image-gallery/styles/css/image-gallery.css";
import "react-image-gallery/styles/css/image-gallery.css";
import AuthManager from "../../auth/AuthManager";
import BasketController from "../../controller/BasketController";
import BackendController from "../../controller/BackendController";


let detail_product = null;
let detail_review = null;
let detail_qa = null;
let detail_refund_exchange = null;

let selected_detail_item = 0;

let backendController = new BackendController();

class DetailLayout extends Component {

    constructor(props) {
        super(props);
        let json = {};
        this.state = {
            data: json
        }
    }

    async componentWillMount() {
        this.getProduct();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidMount() {


    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    async getProduct() {
        let productId = this.props.id;

        let product = await backendController.getItem(productId);
        product.options.unshift({name: "옵션", priceChange: 0})
        this.setState({
            data: product,
            selectedOptionName: "옵션",
            numberToBuy: 1,
            finalPrice: product.price
        });
    }

    render() {
        if (this.state.data._id == undefined)
            return (<div></div>);
        else {
            const images = [];
            for (let i = 0; i < this.state.data.imgSrc.length; i++) {
                images.push({
                    original: this.state.data.imgSrc[i],
                    thumbnail: this.state.data.imgSrc[i],
                    sizes: "(min-width: 250px) 50vw, 100vw"
                });
            }
            return (
                <div>
                    <div class="mainProductContent">
                        <span class="brief">
                            <div class="brief_images">
                                <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false}
                                              autoPlay={true}/>
                            </div>
                            <div class="thumbnail_div">
                                <img id="thumbnailImage" src={this.state.data.thumbnailImageSrc}/>
                                <pre>{this.state.data.thumbnailDescription}</pre>
                            </div>
                        </span>
                        <div class="detail">
                            <div class="quick_nav_wrap">
                                <ul>
                                    <li>
                                        <div><a href="#detail_product" class="selected">PRODUCT</a></div>
                                    </li>
                                    <li>
                                        <div><a href="#detail_review">REVIEW</a></div>
                                    </li>
                                    <li>
                                        <div><a href="#detail_qa">Q&A</a></div>
                                    </li>
                                    <li>
                                        <div><a href="#detail_refund_exchange">교환/환불</a></div>
                                    </li>
                                </ul>
                            </div>
                            <div id="detail_product">
                                {
                                    this.state.data.detail.product_images.map((el) => {
                                        return <img src={el}/>
                                    })
                                }
                            </div>
                            <div id="detail_review">
                                리뷰
                                <div>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br> 리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br> 리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                리뷰테스트<br></br>
                                </div>
                            </div>
                            <div id="detail_qa">
                                Q&A
                                <div>
                                QA테스트<br></br>
                                QA테스트<br></br>
                                QA테스트<br></br>
                                QA테스트<br></br>
                                QA테스트<br></br>
                                QA테스트<br></br>
                                QA테스트<br></br>
                                QA테스트<br></br>
                                QA테스트<br></br>
                                QA테스트<br></br>
                                QA테스트<br></br>
                                QA테스트<br></br>
                                </div>
                            </div>
                            <div id="detail_refund_exchange">
                                반품/교환 정보
                                <table>
                                    <tbody>
                                    <tr>
                                        <th scope="row">판매자명</th>
                                        <td>
                                            <pre>{this.state.data.detail.refund_exchange.seller}</pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">고객문의 대표번호</th>
                                        <td>
                                            <pre>{this.state.data.detail.refund_exchange.phone}</pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">반품/교환 배송비</th>
                                        <td colSpan="3">
                                            <pre>{this.state.data.detail.refund_exchange.transfer_price}</pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">반품/교환지 주소</th>
                                        <td colSpan="3">
                                            <pre>{this.state.data.detail.refund_exchange.address}</pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">반품/교환 안내</th>
                                        <td colSpan="3">
                                            <pre>{this.state.data.detail.refund_exchange.guide}</pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">반품/교환 기준</th>
                                        <td colSpan="3">
                                            <pre>{this.state.data.detail.refund_exchange.criteria}</pre>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={"lastSpace"}/>
                        </div>
                    </div>
                    <div id="detailSideDiv">
                        <h3>
                            {this.state.data.name}
                        </h3>
                        <div id="itemInfo">
                            <div class="itemInfoRow">
                                <div class="itemInfoRowName">제품 코드</div>
                                {this.state.data._id}
                            </div>
                            <div className="itemInfoRow">
                                <div className="itemInfoRowName">판매가</div>
                                {this.state.data.price} {this.state.data.priceUnit}
                            </div>

                        </div>
                        <div id="itemOptions">
                            <SelectBox onSelectionChange={(selName) => {
                                this.state.selectedOptionName = selName;
                                this.state.numberToBuy = 1;
                                this.setState({
                                    selectedOptionName: this.state.selectedOptionName,
                                    numberToBuy: this.state.numberToBuy
                                }, () => {
                                    this.computeFinalPrice();
                                });
                            }} items={this.state.data.options}/>
                        </div>
                        <div className="itemNumber">
                            <div>상품 개수</div>
                            <div>
                                <input type="number" value={this.state.numberToBuy}
                                       onInput={(node) => {
                                           if (node.target.value <= 0) {
                                               window.alert("1개 이상의 수량을 지정하여야 합니다");
                                               node.target.value = 1;
                                           }
                                           this.state.numberToBuy = node.target.value;
                                           this.setState({
                                               numberToBuy: this.state.numberToBuy
                                           })
                                           this.computeFinalPrice();
                                       }
                                       }/>
                            </div>
                        </div>
                        <div className="finalPrice">
                            <div className="itemInfoRowName"><strong>최종 상품 가격</strong></div>
                            {this.state.finalPrice} {this.state.data.priceUnit}
                        </div>
                        <div id="purchaseButtons">
                            <div id="divBuy">
                                <a>구매 하기</a>
                            </div>
                            <div id="basketDiv">
                                <a onClick={async () => {
                                    if (this.state.selectedOptionName == null) {
                                        window.alert("상품의 옵션을 선택해주세요");
                                        return;
                                    } else {
                                        if (this.state.selectedOptionName == "옵션") {
                                            window.alert("상품의 옵션을 선택해주세요");
                                            return;
                                        }
                                        let basketAddResult = await new BasketController().addBasketItem(this.state.data._id, this.state.selectedOptionName, this.state.numberToBuy);
                                        window.alert(basketAddResult.message);
                                    }
                                }
                                }>장바구니 담기</a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    handleScroll = () => {
        let mainProductContentElem = document.getElementsByClassName("mainProductContent")[0];
        let detailElem = document.getElementsByClassName("detail")[0];
        let detailList = document.getElementById("detail_list");
        let quickNavWrap = document.getElementsByClassName("quick_nav_wrap")[0];
        if (window.scrollY >= mainProductContentElem.offsetTop + detailElem.offsetTop) {
            detailElem.classList.add('is_fixed');
        } else {
            detailElem.classList.remove('is_fixed');
        }

        if (detail_product == null) {
            detail_product = document.getElementById("detail_product");
            detail_review = document.getElementById("detail_review");
            detail_qa = document.getElementById("detail_qa");
            detail_refund_exchange = document.getElementById("detail_refund_exchange");

        }

        let product_start = mainProductContentElem.offsetTop + detailElem.offsetTop + detail_product.offsetTop;
        let product_end = product_start + detail_product.offsetHeight;

        let review_start = mainProductContentElem.offsetTop + detailElem.offsetTop + detail_review.offsetTop;
        let review_end = review_start + detail_review.offsetHeight;

        let qa_start = mainProductContentElem.offsetTop + detailElem.offsetTop + detail_qa.offsetTop;
        let qa_end = qa_start + detail_qa.offsetHeight;

        let refund_start = mainProductContentElem.offsetTop + detailElem.offsetTop + detail_refund_exchange.offsetTop;
        let refund_end = refund_start + detail_refund_exchange.offsetHeight;

        let prevSelected_detail_item = selected_detail_item;
        let judgeLine = window.scrollY + quickNavWrap.offsetHeight;

        if (judgeLine < product_end) {
            selected_detail_item = 0;
        } else if (judgeLine >= review_start && judgeLine < review_end) {
            selected_detail_item = 1;

        } else if (judgeLine >= qa_start && judgeLine < qa_end) {
            selected_detail_item = 2;
        } else if (judgeLine >= refund_start && judgeLine < refund_end) {
            selected_detail_item = 3;

        }

        if (prevSelected_detail_item != selected_detail_item) {
            let elements = document.querySelectorAll('.detail .quick_nav_wrap li div a');
            elements.forEach((el) => {
                el.classList.remove("selected");
            })
            elements[selected_detail_item].classList.add("selected");
        }
    }

    computeFinalPrice() {
        let finalPrice = 0;
        for (let i = 0; i < this.state.data.options.length; i++) {
            if (this.state.data.options[i].name == this.state.selectedOptionName) {
                finalPrice += parseInt(this.state.data.options[i].priceChange);
            }
        }
        finalPrice += parseInt(this.state.data.price);
        finalPrice *= this.state.numberToBuy;
        this.setState({finalPrice: finalPrice});
    }

    handleClickDetailMenu = (event) => {
        let elements = document.querySelectorAll('.detail .quick_nav_wrap li div a');
        elements.forEach((el) => {
            el.classList.remove("selected");
        })
        event.target.classList.add("selected");
    }
}

export default DetailLayout;
