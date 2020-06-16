export default function (basketList = [], action) {

    if (action.type === 'addBasket') {

        var basketListCopy = [...basketList];
        basketListCopy.push(action.userOrder);

        return basketListCopy;
    } else {
        return basketList;
    }
}