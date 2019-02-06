import request from "superagent";
import * as Constants from "../Constants";

class BackendController {

    async registerProduct(productJson) {
        let result = await this.requestAPI(Constants.backend + '/api/product/registerProduct', productJson, "POST");

        if (result.ok)
            return await result.json();
        else
            return Promise.reject(result.json());
    }

    async getAllItem() {
        let result = await this.requestAPI(Constants.backend + '/api/product/getAllItem', {}, "POST");
        if (result.ok) {

            result = await result.json();

            result.products.forEach((product) => {
                if (!product.thumbnailImageSrc.startsWith("http")) {
                    product.thumbnailImageSrc = Constants.backend + product.thumbnailImageSrc;
                }

                let imgSrc = product.imgSrc;
                let count = 0;
                imgSrc.forEach((img) => {
                    if (!img.startsWith("http")) {
                        product.imgSrc[count] = Constants.backend + img;
                    }
                    count++;
                })

                let detailImages = product.detail.product_images;
                count = 0;
                detailImages.forEach((img) => {
                    if (!img.startsWith("http")) {
                        product.detail.product_images[count] = Constants.backend + img;
                    }
                    count++;
                })
            })
            return result;
        }
        else
            return Promise.reject(result.json());
    }

    async getItem(productId) {
        let result = await this.requestAPI(Constants.backend + '/api/product/getItem/' + productId, {}, "GET");
        let product = await result.json();
        console.log(product)
        if (result.ok && product) {
            if (!product.thumbnailImageSrc.startsWith("http")) {
                product.thumbnailImageSrc = Constants.backend + product.thumbnailImageSrc;
            }

            let imgSrc = product.imgSrc;
            let count = 0;
            imgSrc.forEach((img) => {
                if (!img.startsWith("http")) {
                    product.imgSrc[count] = Constants.backend + img;
                }
                count++;
            })

            let detailImages = product.detail.product_images;
            count = 0;
            detailImages.forEach((img) => {
                if (!img.startsWith("http")) {
                    product.detail.product_images[count] = Constants.backend + img;
                }
                count++;
            })
            return product;
        }
        else
            return Promise.reject(product);
    }

    async getItems(productIds) {
        let result = await this.requestAPI(Constants.backend + '/api/product/getItems', {product_ids: productIds}, "POST");

        if (result.ok)
            return await result.json();
        else
            return Promise.reject(result.json());
    }

    async getOrderList(user, startDate, endDate, page, pageLimit) {
        let param = {
            user: user,
            start_date: {
                year: startDate.year,
                month: startDate.month,
                day: startDate.day
            },
            end_date: {
                year: endDate.year,
                month: endDate.month,
                day: endDate.day
            },
            page: page,
            page_limit: pageLimit
        }
        let result = await this.requestAPI(Constants.backend + '/api/order/readOrder', param, "POST");

        if (result.ok)
            return await result.json();
        else
            return Promise.reject(result.json());
    }

    async requestRegisterUser(userInfo) {
        let result = await this.requestAPI(Constants.backend + '/api/auth/registerUser', userInfo, "POST");

        if (result.ok)
            return await result.json();
        else
            return Promise.reject(result.json());
    }

    async searchProduct(query, page, pageLimit) {
        let param = {
            query: query,
            page: page,
            pageLimit: pageLimit
        };
        let result = await this.requestAPI(Constants.backend + '/api/search/product', param, "POST");

        if (result.ok)
            return await result.json();
        else
            return null;
    }

    async requestAPI(endPoint, bodyJsonParam, method) {
        if (method == "GET") {
            let res = await fetch(endPoint);
            return res;
        } else {
            let res = await fetch(endPoint,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: method,
                    body: JSON.stringify(bodyJsonParam)
                });
            return res;
        }
    }
}

export default BackendController;
