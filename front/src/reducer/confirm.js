export default function(confirm = [], action){
    
    if(action.type === 'addConfirm'){
        console.log(action.newOrder)
var confirmCopy = [...confirm]
confirmCopy.push(action.newOrder)
        return confirmCopy;
    } else {
        return confirm;
    }
}