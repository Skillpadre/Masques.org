export default function(quantity = 0, action){
    
    if(action.type === 'sendQuantity'){
        quantity = action.userQuantity
        console.log(quantity)
        return quantity
    } else {
        return quantity;
    }
}