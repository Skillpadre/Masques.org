export default function (quantity = 0, action) {

    if (action.type === 'sendQuantity') {
        quantity = action.userQuantity

        return quantity
    } else {
        return quantity;
    }
}