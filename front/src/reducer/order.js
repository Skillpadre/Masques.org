export default function(basketList= [], action){
    
    if(action.type === 'addBasket'){
        console.log('add basket ' + action.userOrder)
        var basketListCopy = [...basketList];
        basketListCopy.push(action.userOrder, action.quantity);
  
  console.log(basketListCopy)
        return basketListCopy;
    } else {
        return basketList;
    }
}