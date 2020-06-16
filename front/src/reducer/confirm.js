export default function (confirm = [], action) {

    if (action.type === 'addConfirm') {

        var confirmCopy = [...confirm]
        confirmCopy.push(action.newOrder)

        localStorage.setItem("confirm", JSON.stringify(confirmCopy));
        return confirmCopy;
    } else {
        return confirm;
    }
}