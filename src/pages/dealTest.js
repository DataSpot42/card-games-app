import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import CardDealer from '../components/cardDealer'
import './cardGames.css'

const DealTest = () => {
    const [deck, setDeck] = useState()
    
    const handleDealCards = async (e) => {
        setDeck(null)
        let shuffledDeck = CardDealer()
             let ourDeck = await JSON.parse(shuffledDeck);
             setDeck(ourDeck)

    }

    return (
        <div className="cardDeal">            
            <button className="dealMe" onClick={(e) => handleDealCards(e)}>Deal All Cards</button>

            <div className="cardDeal">
            <AnimatePresence>
                {deck ? deck.map((deck, index) =>
                
                <motion.div 
                    initial={{ y: 1000 }}
                    animate={{ y: 0 }}
                    transition={{ delay:0.25*index, type: "spring", stiffness: 200, damping: 22 }}
                    exit={{ x: -1000, transition: {
                        duration: 0.15}}} 
                    key={deck.key}>                    
                        <img src={`https://deckofcardsapi.com/static/img/${deck.card}.png`} height={"120px"} width={"70px"} alt={deck.card} />
                        </motion.div>
                    )
                    : <></>}
                    </AnimatePresence>
            </div>
        </div>
        
    )
}
export default DealTest