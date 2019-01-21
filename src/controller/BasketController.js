import AuthManager from "../auth/AuthManager";

class BasketController {
    async addBasketItem(id, optionName, num) {
        let curUser = await new AuthManager().getAuthInfo().user;
        let localBasketInfo = JSON.parse(localStorage.getItem("basket"));
        if (!localBasketInfo)
            localBasketInfo = {};

        if (!localBasketInfo[curUser])
            localBasketInfo[curUser] = {};

        if (!localBasketInfo[curUser][id])
            localBasketInfo[curUser][id] = {};

        if (!localBasketInfo[curUser][id][optionName]) {
            localBasketInfo[curUser][id][optionName] = {id: id, optionName: optionName, num: num};

            localStorage.setItem("basket", JSON.stringify(localBasketInfo));

            return {isSuccess: true, message: "장바구니에 담았습니다"};
        }
        else {
            return {isSuccess: false, message: "해당 상품은 이미 장바구니에 담으셨습니다"};
        }
    }

    async removeBasketItem(id, optionName) {
        let curUser = await new AuthManager().getAuthInfo().user;
        let localBasketInfo = JSON.parse(localStorage.getItem("basket"));

        if (localBasketInfo[curUser][id][optionName] == null) {
            return {isSuccess: false, message: "장바구니에 존재하지 않는 상품입니다."};
        }
        else {
            delete localBasketInfo[curUser][id][optionName];
            localStorage.setItem("basket", JSON.stringify(localBasketInfo));
            return {isSuccess: true, message: "장바구니에서 상품을 제거하였습니다"};
        }
    }

    async emptyBasket() {
        let curUser = await new AuthManager().getAuthInfo().user;
        let localBasketInfo = JSON.parse(localStorage.getItem("basket"));

        if (localBasketInfo[curUser] == null) {
            return ({isSuccess: false, message: "장바구니가 비어 있습니다"});
        }
        else {
            delete localBasketInfo[curUser];
            localStorage.setItem("basket", JSON.stringify(localBasketInfo));
            return ({isSuccess: true, message: "장바구리를 비웠습니다"});
        }


    }

    async getBasketItems() {
        let basketItemsArray = [];

        let curUser = await new AuthManager().getAuthInfo().user;
        if (!localStorage.getItem("basket"))
            localStorage.setItem("basket", JSON.stringify({}));

        let basketItemAsProduct = JSON.parse(localStorage.getItem("basket"))[curUser];

        if (!basketItemAsProduct)
            return basketItemsArray;

        for (let productItem in basketItemAsProduct) {
            for (let optionItem in basketItemAsProduct[productItem]) {
                basketItemsArray.push(basketItemAsProduct[productItem][optionItem]);
            }

        }

        return basketItemsArray;
    }
}

export default BasketController;