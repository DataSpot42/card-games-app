import { motion } from "framer-motion";
import './cardDeal.css'

const CardDealer = () => {

let suitsA = ["H","D","C","S"];   // store suits in array
let cardsA = ["A","2","3","4","5","6","7","8","9","0","J","Q","K"];  // store cards
let valuesA = [99,2,3,4,5,6,7,8,9,10,10,10,10]
let card1 = [`${cardsA[0]}`, `of`, `${suitsA[0]}`]  // build a card
let number = 0
let obj = {}
let deck = [];
let currentsuit = "";
let firstShuffle = [];
let secondShuffle
let hand1 = [];
let hand2 = [];
let rand1 = 0;   // create variables used in program


for (let i = 0 ; i < suitsA.length ; i++) {
    currentsuit = (`${suitsA[i]}`)   // sets the suit of cards to make
    for (let j = 0 ; j < cardsA.length ; j++) {
      obj = {key: number, card: `${cardsA[j]}${suitsA[i]}`, value:`${valuesA[j]}` }      
     deck.push(obj)   // adds each of the cards in that suit
     number++
    }   // now we have all 52 cards
 console.log(deck)
 }

 for (let k = 0 ; k < 52; k++) {     // loop to create a hand of 5 cards    
    rand1 = (Math.floor(Math.random() * (deck.length)))   // creates a random number within the range    
    firstShuffle = {key: deck[rand1].key, card:deck[rand1].card, value:deck[rand1].value}  // draws a card from those that are available    
    hand1.push(firstShuffle);  // adds that to the player's hand    
    deck.splice(rand1,1);  // removes that card from the available deck
 }
 for (let m = 0 ; m < 52; m++) {     // loop to create a hand of 5 cards    
   rand1 = (Math.floor(Math.random() * (deck.length)))   // creates a random number within the range    
   secondShuffle = {key: hand1[rand1].key, card:hand1[rand1].card, value:hand1[rand1].value}  // draws a card from those that are available    
   hand2.push(secondShuffle);  // adds that to the player's hand    
   hand1.splice(rand1,1);  // removes that card from the available deck
}


console.log(hand2)  //outputs the hand

return JSON.stringify(hand2)
   // <div  className="cardDeal">
   
   //  {hand2.map((hand2,key) => 
   //  <div key={hand2.key}>
   //    <img src={`https://deckofcardsapi.com/static/img/${hand2.card}.png`} height={"100px"} width={"60px"} alt={hand2.card} /></div>) }
    
   // </div>
}
export default CardDealer


