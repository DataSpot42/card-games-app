import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import CardDealer from '../components/cardDealer'
import './cardGames.css'


const Home=() => {
    const navigate = useNavigate();
    const [deck, setDeck] = useState()
    useEffect(() => {
        const fetchDeck = async () => {
            let shuffledDeck = CardDealer()
            let ourDeck = await JSON.parse(shuffledDeck);
            setDeck(ourDeck)            
        }
        fetchDeck()
    }, [])
    console.log(deck)

    return (
        <div>      
        <div className="cardText">
            <p>Card Games App</p>
            <p>New games will be added over time, for now try 21!</p>
            <button className="dealMe" onClick={()=> navigate('/TwentyOne')}>21 Game</button>
            
            <li>Play with all 52 cards to get a high score</li>
            
        </div>
        <p></p>
         <div className="cardDeal">
         <AnimatePresence>
             {deck ? deck.map((deck, index) =>
             
             <motion.div 
                 initial={{ y: 1000 }}
                 animate={{ y: 0 }}
                 transition={{ delay:0.03*index, type: "spring", stiffness: 200, damping: 22 }}
                 exit={{ x: -1000, transition: {
                     duration: 0.15}}} 
                 key={deck.key}>                    
                     <img src={`https://deckofcardsapi.com/static/img/${deck.card}.png`} height={"50px"} width={"30px"} alt={deck.card} />
                     </motion.div>
                 )
                 : <></>}
                 </AnimatePresence>
         </div>
     </div>
    )
}
export default Home