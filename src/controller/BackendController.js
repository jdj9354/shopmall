import request from "superagent";
import * as Constants from "../Constants";

class BackendController {
    async getItem(productId) {
        let result = await this.requestAPI(Constants.backend + '/api/product/getItem/' + productId, {}, "GET");
        if(result.ok)
            return await result.json();
        else
            return Promise.reject(new Error(400));
    }

    async getItems(productIds) {
        let result = await this.requestAPI(Constants.backend + '/api/product/getItems', {product_ids: productIds}, "POST");

        if(result.ok)
            return await result.json();
        else
            return Promise.reject(new Error(400));
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

        if(result.ok)
            return await result.json();
        else
            return Promise.reject(new Error(400));
    }
    
    async requestRegisterUser(userInfo){
        let result = await this.requestAPI(Constants.backend + '/api/auth/registerUser',userInfo,"POST");

        if(result.ok)
            return await result.json();
        else
            return Promise.reject(new Error(400));
    }

    async searchProduct(query, page, pageLimit){
        let param = {
            query: query,
            page: page,
            pageLimit: pageLimit
        };
        let result = await this.requestAPI(Constants.backend + '/api/search/product', param, "POST");

        if(result.ok)
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
