
const MyTotal = (hand) => {
    
    let totalArr1 = []
    let sum = []
    let ace = 0
    
    for (let i = 0; i < hand.length; i++) {
        if (parseInt(hand[i].value) === 99) { totalArr1.push(11); ace = ace + 10 }
        else {
            totalArr1.push(parseInt(hand[i].value))   //Ace can be 1 or 11
        }
    }    
    sum[0] = totalArr1.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0);

    if (ace > 0) { sum.push(sum[0] - ace) } else { sum.push(sum[0]) } //setting total
    
    return sum
}
export default MyTotal