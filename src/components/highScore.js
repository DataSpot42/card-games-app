
export const getScore = async () => {
    
    let response = JSON.parse(localStorage.getItem('highScore'));
    let data = await response
    if (data === null || data === 0) {  //checks to see if highscore has been set
        let obj = { highScore: 0 } 
        data = await localStorage.setItem("highScore", JSON.stringify(obj)); // if not saves object
        
    }
    
    return data
}
export const saveScore = async (score) => {
    
    let response = JSON.parse(localStorage.getItem('highScore'));
    if (response.highScore<score) {
    let obj = { highScore: score }   
    
    localStorage.setItem("highScore", JSON.stringify(obj));
    return JSON}            //saves new highscore
    else {return score}
}
export const deleteScore = async (score) => {    
    let obj = { highScore: score}
    
    localStorage.setItem("highScore", JSON.stringify(obj));
    return JSON    
}



