import React, {Component} from 'react';
import './ProductRegister.css';
import BackendController from "../../controller/BackendController";

class ProductRegister extends Component {
    constructor(props) {
        super(props);
    }

    onRequestUpdate() {
        let updateJson = {
            _id: "",
            sale: 0,
            options: [],
            name: "",
            price: 0,
            priceUnit: "",
            imgSrc: [],
            thumbnailImageSrc: "",
            thumbnailDescription: "",
            detail: {
                product_images: [],
                review: {},
                qa: {},
                refund_exchange: {
                    seller: "",
                    phone: "",
                    transfer_price: "",
                    address: "",
                    guide: "",
                    criteria: ""
                }
            }
        }

        updateJson._id = document.getElementById("modelNameInput").value;
        updateJson.name = document.getElementById("productNameInput").value;
        updateJson.price = document.getElementById("priceInput").value;

        let priceUniSel = document.getElementById("priceUnitSel")
        updateJson.priceUnit = priceUniSel.options[priceUniSel.selectedIndex].value;

        updateJson.sale = document.getElementById("saleInput").value;

        let optionListDiv = document.getElementById("optionList");
        for (let i = 0; i < optionListDiv.childElementCount; i++) {
            let optionItem = optionListDiv.children[i];
            updateJson.options.push({
                name: optionItem.children[0].innerText,
                priceChange: optionItem.children[1].innerText
            });
        }

        let productImageListDiv = document.getElementById("productImages");
        for (let i = 0; i < productImageListDiv.childElementCount; i++) {
            let imageItem = productImageListDiv.children[i];
            updateJson.imgSrc.push(imageItem.children[0].src);
        }

        let thumbnailImageListDiv = document.getElementById("thumbnailImage");
        for (let i = 0; i < thumbnailImageListDiv.childElementCount; i++) {
            let imageItem = thumbnailImageListDiv.children[i];
            updateJson.thumbnailImageSrc = imageItem.children[0].src;
        }

        updateJson.thumbnailDescription = document.getElementById("thumbnailDescription").value;

        let detailListDiv = document.getElementById("detailImages");
        for (let i = 0; i < detailListDiv.childElementCount; i++) {
            let imageItem = detailListDiv.children[i];
            updateJson.detail.product_images.push(imageItem.children[0].src);
        }

        updateJson.detail.refund_exchange.seller = document.getElementById("seller").value;
        updateJson.detail.refund_exchange.phone = document.getElementById("phone_seller").value;
        updateJson.detail.refund_exchange.transfer_price = document.getElementById("refund_transfer_price").value;
        updateJson.detail.refund_exchange.address = document.getElementById("seller_address").value;
        updateJson.detail.refund_exchange.guide = document.getElementById("refund_guide").value;
        updateJson.detail.refund_exchange.criteria = document.getElementById("refund_criteria").value;


        let registerResult = new BackendController().registerProduct(updateJson);

    }

    render() {
        return (
            <div className="ProductRegister">
                <form>
                    <div>모델명 <br/><input id="modelNameInput" type="text"/></div>
                    <div>상품이름 <br/><input id="productNameInput" type="text"/></div>
                    <div>가격 <br/><input id="priceInput" type="number"/></div>
                    <div>가격 단위 <br/><select id="priceUnitSel">
                        <option value="원">원</option>
                        <option value="엔">엔</option>
                        <option value="USD">USD</option>
                    </select></div>
                    <div>할인율 <br/><input id="saleInput" type="number"/></div>
                    <div>
                        옵션<br/>
                        <div>
                            옵션명 <br/><input id='optionName' type="text"/><br/>
                            옵션가격 <br/><input id='optionPrice' type="number"/><br/>
                            <button onClick={(event) => {
                                event.preventDefault();
                                let listObj = event.target.parentElement.nextElementSibling;
                                let listItem = document.createElement("div");

                                let optionNameDiv = document.createElement("div");
                                optionNameDiv.innerText = document.getElementById('optionName').value;
                                document.getElementById('optionName').value = "";

                                let optionPriceDiv = document.createElement("div");
                                optionPriceDiv.innerText = document.getElementById('optionPrice').value;
                                document.getElementById('optionPrice').value = "";

                                listItem.appendChild(optionNameDiv);
                                listItem.appendChild(optionPriceDiv);

                                let listItemDeleteButton = document.createElement("button");
                                listItemDeleteButton.innerText = "삭제";
                                listItemDeleteButton.onclick = (event) => {
                                    let removetarget = event.target.parentElement;
                                    removetarget.parentElement.removeChild(removetarget);
                                };
                                listItem.appendChild(listItemDeleteButton);

                                listObj.appendChild(listItem);
                            }}>추가
                            </button>
                        </div>
                        옵션 리스트
                        <div id="optionList">
                        </div>
                    </div>
                    <div>상품 이미지 <br/><input type="file" multiple onChange={(e) => {
                        let thumbnailImgsDiv = e.target.nextElementSibling;
                        let imgFiles = e.target.files;
                        for (let i = 0; i < imgFiles.length; i++) {
                            let thumbnailImgDiv = document.createElement("div");
                            thumbnailImgsDiv.appendChild(thumbnailImgDiv);
                            let imgFile = imgFiles[i];
                            let reader = new FileReader();
                            let thumbnailImg = document.createElement("img");
                            thumbnailImgDiv.appendChild(thumbnailImg);

                            reader.onload = (event) => {
                                thumbnailImg.style.height = "auto";
                                thumbnailImg.style.maxHeight = "100%";
                                thumbnailImg.style.maxWidth = "100%";
                                thumbnailImg.src = event.target.result;
                            }

                            reader.readAsDataURL(imgFile);

                            let listItemDeleteButton = document.createElement("button");
                            listItemDeleteButton.innerText = "삭제";
                            listItemDeleteButton.onclick = (event) => {
                                let removetarget = event.target.parentElement;
                                removetarget.parentElement.removeChild(removetarget);
                            };
                            thumbnailImgDiv.appendChild(listItemDeleteButton);
                        }
                    }}/>
                        <div id='productImages'></div>
                    </div>
                    <div>썸네일 이미지 <br/><input type="file" onChange={(e) => {
                        let thumbnailImgsDiv = e.target.nextElementSibling;
                        if (thumbnailImgsDiv.childElementCount != 0) {
                            window.alert("썸네일 이미지는 하나만 등록 해주세요");
                            return;
                        }
                        let imgFiles = e.target.files;
                        for (let i = 0; i < imgFiles.length; i++) {
                            let thumbnailImgDiv = document.createElement("div");
                            thumbnailImgsDiv.appendChild(thumbnailImgDiv);
                            let imgFile = imgFiles[i];
                            let reader = new FileReader();
                            let thumbnailImg = document.createElement("img");
                            thumbnailImgDiv.appendChild(thumbnailImg);

                            reader.onload = (event) => {
                                thumbnailImg.style.height = "auto";
                                thumbnailImg.style.maxHeight = "100%";
                                thumbnailImg.style.maxWidth = "100%";
                                thumbnailImg.src = event.target.result;
                            }

                            reader.readAsDataURL(imgFile);

                            let listItemDeleteButton = document.createElement("button");
                            listItemDeleteButton.innerText = "삭제";
                            listItemDeleteButton.onclick = (event) => {
                                let removetarget = event.target.parentElement;
                                removetarget.parentElement.removeChild(removetarget);
                            };
                            thumbnailImgDiv.appendChild(listItemDeleteButton);
                        }

                    }}/>
                        <div id='thumbnailImage'></div>
                    </div>
                    <div>썸네일 설명 <br/><textarea id="thumbnailDescription" onKeyDown={(event) => {
                        let obj = event.target;
                        obj.style.height = "1px";
                        obj.style.height = (12 + obj.scrollHeight) + "px";
                    }}></textarea></div>
                    <div>상세 이미지 <br/><input type="file" multiple onChange={(e) => {
                        let thumbnailImgsDiv = e.target.nextElementSibling;
                        let imgFiles = e.target.files;
                        for (let i = 0; i < imgFiles.length; i++) {
                            let thumbnailImgDiv = document.createElement("div");
                            thumbnailImgsDiv.appendChild(thumbnailImgDiv);
                            let imgFile = imgFiles[i];
                            let reader = new FileReader();
                            let thumbnailImg = document.createElement("img");
                            thumbnailImgDiv.appendChild(thumbnailImg);

                            reader.onload = (event) => {
                                thumbnailImg.style.height = "auto";
                                thumbnailImg.style.maxHeight = "100%";
                                thumbnailImg.style.maxWidth = "100%";
                                thumbnailImg.src = event.target.result;
                            }

                            reader.readAsDataURL(imgFile);

                            let listItemDeleteButton = document.createElement("button");
                            listItemDeleteButton.innerText = "삭제";
                            listItemDeleteButton.onclick = (event) => {
                                let removetarget = event.target.parentElement;
                                removetarget.parentElement.removeChild(removetarget);
                            };
                            thumbnailImgDiv.appendChild(listItemDeleteButton);
                        }
                    }}/>
                        <div id='detailImages'></div>
                    </div>
                    <div>판매자 <br/><input id="seller" type="text"/></div>
                    <div>판매자 전화번호 <br/><input id="phone_seller" type="text"/></div>
                    <div>반품 배송 가격 <br/><input id="refund_transfer_price" type="text"/></div>
                    <div>판매자 주소 <br/><textarea id="seller_address" onKeyDown={(event) => {
                        let obj = event.target;
                        obj.style.height = "1px";
                        obj.style.height = (12 + obj.scrollHeight) + "px";
                    }}></textarea></div>
                    <div>환불 가이드 <br/><textarea id="refund_guide" onKeyDown={(event) => {
                        let obj = event.target;
                        obj.style.height = "1px";
                        obj.style.height = (12 + obj.scrollHeight) + "px";
                    }}></textarea></div>
                    <div>환불 기준 <br/><textarea id="refund_criteria" onKeyDown={(event) => {
                        let obj = event.target;
                        obj.style.height = "1px";
                        obj.style.height = (12 + obj.scrollHeight) + "px";
                    }}></textarea></div>
                </form>
                <button onClick={() => this.onRequestUpdate()}>등록 요청</button>
            </div>
        )
    }
}

export default ProductRegister;