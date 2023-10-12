import CardDealer from "../components/cardDealer"
import { useState, useEffect } from "react";
import MyTotal from "../components/twentyOneTotal";
import { motion, AnimatePresence } from "framer-motion";
import './cardGames.css'
import { getScore, saveScore, deleteScore } from "../components/highScore"


const TwentyOne = () => {

    const [deck, setDeck] = useState()
    const [myHand, setMyHand] = useState([])
    const [myPlay, setMyPlay] = useState([])
    // eslint-disable-next-line
    const [bust, setBust] = useState(false)
    const [total, setTotal] = useState(0)
    const [gameOver, setGameOver] = useState(0)
    const [saved, setSaved] = useState(0)
    const [highScore, setHighScore] = useState(0)
    let score = 0;
    useEffect(() => {
        const fetchScore = async () => {
            let data = await getScore()   //get items from storage
            setHighScore(data.highScore)
        }
        fetchScore()
    }, [])

    useEffect(() => {
        const fetchDeck = async () => {
            let shuffledDeck = CardDealer()
            let ourDeck = await JSON.parse(shuffledDeck);
            setDeck(ourDeck)
            setMyHand([])
        }
        fetchDeck()
    }, [])

    const handleDealme = async (e) => {
        e.preventDefault()

        if (deck.length >= 2) {
            let dealt = [deck[0], deck[1]]
            setMyHand(dealt)
            let whatsLeft = deck
            whatsLeft.splice(0, 2);
            setDeck(whatsLeft)
            let sum = MyTotal(dealt)
            if (sum[0] > 21 && sum[1] > 21) { setBust(true) }
            setMyPlay(sum)
        }
        else {
            let sum = 0
            if (deck.length === 1) {
                sum = parseInt(deck[0])
            } else { sum = 0 }
            let sumT = sum + myPlay
            setMyPlay(sumT)
        }
        setSaved(1)     

    }
    const handleAnotherCard = async (e) => {
        e.preventDefault()
        let newCard = deck[0]
        let newHand = ([...myHand, newCard])
        setMyHand(newHand)
        let whatsLeft = deck
        whatsLeft.splice(0, 1);
        setDeck(whatsLeft)
        let sum = MyTotal(newHand)
        if (sum[0] > 21 && sum[1] > 21) { setBust(true) }
        setMyPlay(sum)
        setSaved(1)

    }
    const handleStick = async (e) => {
        e.preventDefault()
        if (deck.length < 1) {

            setGameOver(1)
            setTotal(0)

        }
        let subtotal = total

        if (myPlay[1] < 22 || myPlay[0] < 22) {
            if (myPlay[0] >= myPlay[1] && myPlay[0] < 22) { score = myPlay[0] }
            else { score = myPlay[1] }
        }
        if (myPlay[0] === 21 || myPlay[1] === 21) {
            score = 50
        }
        if (myPlay[0] > 21 && myPlay[1] > 21) {   // scoring system
            score = 0
        }
        subtotal = subtotal + score
        setTotal(subtotal)
        // eslint-disable-next-line
        let response = await saveScore(subtotal)

        let data = await getScore()

        setHighScore(data.highScore)

        setSaved(0)
    }
    const handleNewGame = async (e) => {
        e.preventDefault()
        setGameOver(0)
        let shuffledDeck = CardDealer()
        let ourDeck = await JSON.parse(shuffledDeck);
        setDeck(ourDeck)
        setMyHand([])
        setTotal(0)

    }
    const handleClearHighScore = async (e) => {
        e.preventDefault()
        // eslint-disable-next-line
        let response = await deleteScore(0)
        let data = await getScore()
        setHighScore(data.highScore)
    }

    return (
        <div>
            <div className="cardText">
                <li>Deal to take 2 cards, take more if you wish</li>
                <li>Near as you dare to 21? Press STICK to save score</li>
                <li>Keep dealing until you run out of cards to get high score</li>
                {deck ? <p>Number of Cards Left: {deck.length}</p> : <></>}

            </div>
            <div className="button-container">
                {gameOver === 0 && <><button className="dealMe" onClick={(e) => handleDealme(e)}>Deal</button>
                    <button className="dealMe" onClick={(e) => handleAnotherCard(e)}>Another Card</button></>}
                {saved === 1 && gameOver === 0 && <button className="dealMe" onClick={(e) => handleStick(e)}>Stick</button>}
            </div>
            <div className="cardDeal">
            <AnimatePresence>
                {myHand ? myHand.map((myHand, index) =>
                    
                        <motion.div 
                            className="cards"
                            initial={{ y: 1000 }}
                            animate={{ y: 0 }}
                            transition={{ delay:0.25*index, type: "spring", stiffness: 200, damping: 22 }}
                            exit={{ x: -1000, transition: {
                                duration: 0.15}}} 
                            key={myHand.key}>
                                <img  src={`https://deckofcardsapi.com/static/img/${myHand.card}.png`}  alt={myHand.card} />
                        </motion.div>
                    )
                    : <p>Awaiting Deal</p>}
                    </AnimatePresence>
            </div>
            <div className="cardTextLower">
                {myPlay ? <li>Hand Total: {myPlay[0]}</li> : <li></li>}
                {myPlay[1] !== myPlay[0] && <p> or {myPlay[1]}</p>}
                {myPlay[1] > 21 && <p>You bust!</p>}
                {(myPlay[0] === 21 || myPlay[1] === 21) && <p>21! You score 50 points (press STICK)</p>}

                {total ? <li>Your Total = {total} points</li> : <li>0 points</li>}
                {gameOver === 1 && <div>
                    <p>Game Over</p>
                    <button className="dealMe" onClick={(e) => handleNewGame(e)}>NewGame</button></div>}
                
                {highScore ? <li>Your High Score = {highScore} points</li> : <li>No High Score found</li>}
                {highScore ? <button className="dealMe" onClick={(e) => handleClearHighScore(e)}>Clear HighScore</button> : <></>}
            </div>
        </div>
    )
}
export default TwentyOne