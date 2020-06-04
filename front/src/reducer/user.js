export default function(userToken= null, action){
    
    if(action.type === 'addToken'){
        console.log('add token ' + action.token)
        return action.token;
    } else if (action.type === 'deleteToken') {
        let token = null
        return token;

    } else {
        return userToken;
    }
}