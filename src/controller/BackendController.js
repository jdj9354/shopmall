import request from "superagent";
import * as Constants from "../Constants";

class BackendController {
    async getItem(productId) {
        let result = await this.requestAPI(Constants.backend + '/api/product/getItem/' + productId, {}, "GET");
        console.log(result)
        if(result.ok)
            return await result.json();
        else
            return null;
    }

    async getItems(productIds) {
        let result = await this.requestAPI(Constants.backend + '/api/product/getItems', {product_ids: productIds}, "POST");

        if(result.ok)
            return await result.json();
        else
            return null;
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
