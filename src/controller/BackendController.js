import request from "superagent";
import * as Constants from "../Constants";

class BackendController{
    async getItem(productId){
        return await this.requestAPI(Constants.backend + '/api/product/getItem/' + productId,{},"GET");
    }

    async getItems(productIds){
        return await this.requestAPI(Constants.backend + '/api/product/getItems',{product_ids:productIds},"POST");
    }

    async requestAPI(endPoint,bodyJsonParam,method){
        if(method == "GET") {
            let res = await fetch(endPoint);
            return await res.json();
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
                return await res.json();
        }
    }
}

export default BackendController;
