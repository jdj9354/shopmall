import AuthManager from "../auth/AuthManager";

class BasketController {
    async addBasketItem(id, optionName, num) {

        let curUserInfo = await new AuthManager().getAuthInfo();
        let curUserId = curUserInfo.user;

        let localBasketInfo = JSON.parse(localStorage.getItem("basket"));
        if (!localBasketInfo)
            localBasketInfo = {};

        if (!localBasketInfo[curUserId])
            localBasketInfo[curUserId] = {};

        if (!localBasketInfo[curUserId][id])
            localBasketInfo[curUserId][id] = {};

        if (!localBasketInfo[curUserId][id][optionName]) {
            localBasketInfo[curUserId][id][optionName] = {id: id, optionName: optionName, num: num};

            localStorage.setItem("basket", JSON.stringify(localBasketInfo));

            return {isSuccess: true, message: "장바구니에 담았습니다"};
        }
        else {
            return {isSuccess: false, message: "해당 상품은 이미 장바구니에 담으셨습니다"};
        }
    }

    async removeBasketItem(id, optionName) {

        let curUserInfo = await new AuthManager().getAuthInfo();
        let curUserId = curUserInfo.user;

        let localBasketInfo = JSON.parse(localStorage.getItem("basket"));

        if (localBasketInfo[curUserId][id][optionName] == null) {
            return {isSuccess: false, message: "장바구니에 존재하지 않는 상품입니다."};
        }
        else {
            delete localBasketInfo[curUserId][id][optionName];
            localStorage.setItem("basket", JSON.stringify(localBasketInfo));
            return {isSuccess: true, message: "장바구니에서 상품을 제거하였습니다"};
        }
    }

    async emptyBasket() {

        let curUserInfo = await new AuthManager().getAuthInfo();
        let curUserId = curUserInfo.user;

        let localBasketInfo = JSON.parse(localStorage.getItem("basket"));

        if (localBasketInfo[curUserId] == null) {
            return ({isSuccess: false, message: "장바구니가 비어 있습니다"});
        }
        else {
            delete localBasketInfo[curUserId];
            localStorage.setItem("basket", JSON.stringify(localBasketInfo));
            return ({isSuccess: true, message: "장바구리를 비웠습니다"});
        }


    }

    async overrideAsGuestBasket(){
        let curUserInfo = await new AuthManager().getAuthInfo();
        let curUserId = curUserInfo.user;

        let localBasketInfo = JSON.parse(localStorage.getItem("basket"));
        if(localBasketInfo["guest"]) {
            localBasketInfo[curUserId] = localBasketInfo["guest"];
            localBasketInfo["guest"] = {};

            localStorage.setItem("basket", JSON.stringify(localBasketInfo));
        }
    }

    async getBasketItems() {
        let basketItemsArray = [];

        let curUserInfo = await new AuthManager().getAuthInfo();
        let curUserId = curUserInfo.user;

        if (!localStorage.getItem("basket"))
            localStorage.setItem("basket", JSON.stringify({}));

        let basketItemAsProduct = JSON.parse(localStorage.getItem("basket"))[curUserId];

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