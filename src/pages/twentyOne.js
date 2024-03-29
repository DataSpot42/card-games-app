import CardDealer from "../components/cardDealer"
import { useState, useEffect } from "react";
import MyTotal from "../components/twentyOneTotal";
import { motion, AnimatePresence } from "framer-motion";
import './cardGames.css'
import { getScore, saveScore, deleteScore } from "../components/highScore"
import InstPopup from "../components/popup"
import inst from "../components/instructions";


const TwentyOne = () => {
    const instructions = inst()   
    const [deck, setDeck] = useState()
    const [myHand, setMyHand] = useState([])
    const [myPlay, setMyPlay] = useState([])
    const [total, setTotal] = useState(0)
    const [gameOver, setGameOver] = useState(0)
    const [saved, setSaved] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [score, setScore] = useState(0)
    const [perfectHand, setPerfectHand] = useState("dealMe")
    let subTotal=0
    let sub=0
    
    useEffect(() => {
        const fetchScore = async () => {
            let data = await getScore()   //get highscore from storage
            setHighScore(data.highScore)
        }
        fetchScore()
    }, [])

    useEffect(() => {
        const fetchDeck = async () => {
            let shuffledDeck = CardDealer()
            let ourDeck = await JSON.parse(shuffledDeck);
            setDeck(ourDeck)    // fetch new shuffled deck
            setMyHand([])
        }
        fetchDeck()
    }, [])

    const handleDealme = async (e) => {
        e.preventDefault()
        let sum = 0
        setScore(0);
        if (deck.length > 1) {
            let dealt = [deck[0], deck[1]]
            setMyHand(dealt)
            let whatsLeft = deck
            whatsLeft.splice(0, 2);
            setDeck(whatsLeft)   //deal 2 cards and take them out of the deck
            sum = MyTotal(dealt)
            setMyPlay(sum)
        }
        else {
            sum = 0
            if (deck.length === 1) {
                sum = parseInt(deck[0])
            } else { sum = 0 }
            let sumT = sum + myPlay
            setMyPlay(sumT)
        }
        setSaved(1)

        if (sum[0] === 21 || sum[1] === 21) {
            setPerfectHand("dealMe flash")
            
        } else { setPerfectHand("dealMe") }

    }
    const handleAnotherCard = async (e) => {
        e.preventDefault()
        let newCard = deck[0]
        let newHand = ([...myHand, newCard])
        setMyHand(newHand)  //add another card to hand
        let whatsLeft = deck
        whatsLeft.splice(0, 1);
        setDeck(whatsLeft)
        let sum = MyTotal(newHand)        
        setMyPlay(sum)
        setSaved(1)

        if (sum[0] === 21 || sum[1] === 21) {
            setPerfectHand("dealMe flash")
            setPerfectHand("dealMe flash")
        }
        else { setPerfectHand("dealMe") }  //change button style upon hand being 21
    }
    const handleStick = async (e) => {
        e.preventDefault()
        if (deck.length < 1) {
            setGameOver(1)
            setTotal(0)
        }
        let subTotal = total

        if (myPlay[1] < 22 || myPlay[0] < 22) {
            if (myPlay[0] >= myPlay[1] && myPlay[0] < 22) { setScore(myPlay[0]); sub=(myPlay[0]) }
            else { setScore(myPlay[1]) }
        }
        if (myPlay[0] === 21 || myPlay[1] === 21) {
            setScore(50); sub=50; if (myHand.length===2) {setScore(60); sub=60}}  
            // bonus points if you get 21 with 2 cards      
        
        if (myHand.length===5){ setScore(myPlay[0]+10); sub=myPlay[0]+20; // hand +20 you get 5 cards under 21
        if (myPlay[0] === 21 || myPlay[1] === 21) {
            setScore(75); sub=75}} // 75 if you get 21 with 5 cards
        if (myPlay[0] > 21 && myPlay[1] > 21) {   
            setScore(0); sub=0  // bust and you score nothing
        }
        subTotal = total+sub
        
        
        setTotal(subTotal)
        setPerfectHand("dealMe")
        // eslint-disable-next-line
        let response = await saveScore(subTotal)  
        //check locally stored highscores, if new total is higher save new score
        let data = await getScore()
        setHighScore(data.highScore)
        setSaved(0)
    }
    const handleNewGame = async (e) => {
        e.preventDefault()
        setGameOver(0)
        let shuffledDeck = CardDealer()  //shuffle desk with the CardDealer component
        let ourDeck = await JSON.parse(shuffledDeck);
        setDeck(ourDeck)
        setMyHand([])
        setTotal(0)
        setMyPlay([0, 0])   //reset for new game

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
            <div>
                <InstPopup ins={instructions} />  {/*popup for instrucions */}
                {deck ? <div>
                    {deck.length > 0 && <div className="cardText">Number of cards left: {deck.length} </div>}
                    {(deck.length === 0 || (deck.length === 1 && myPlay[1] > 21)) && <div className="cardText">Game Over</div>}

                    <div className="button-container">
                        {deck.length > 1 && <><button className="dealMe" onClick={(e) => handleDealme(e)}>Deal</button></>}
                        {(saved === 1 && deck.length > 0 && deck.length < 52 && myHand.length < 5) && gameOver === 0 && myPlay[1] < 22 && <><button className="dealMe" onClick={(e) => handleAnotherCard(e)}>Another Card</button></>}
                        {(deck.length < 52 && saved === 1 && myPlay[1] < 22) && <button className={perfectHand} onClick={(e) => handleStick(e)}>Stick</button>}
                        {((deck.length < 2 && saved === 0) || (deck.length < 2 && myPlay[1] > 21)) &&
                            <button className="dealMe" onClick={(e) => handleNewGame(e)}>NewGame?</button>}
                    </div> </div> : <></>}  {/*conditional redering to ensure game plays correctly} */}
            </div>
            <div className="dealContainter">
                <div className="cardDeal">
                    <AnimatePresence>
                        {myHand ? myHand.map((myHand, index) =>
                            // animate on the cards
                            <motion.div
                                className="cards"  // deal each hand
                                initial={{ y: 1000 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.15 * index, type: "spring", stiffness: 200, damping: 22 }}
                                exit={{
                                    x: -1000, transition: {
                                        duration: 0.15
                                    }
                                }}
                                key={myHand.key}>
                                <img src={`https://deckofcardsapi.com/static/img/${myHand.card}.png`} alt={myHand.card} />
                            </motion.div>
                        )
                            : <p>Awaiting Deal</p>}
                    </AnimatePresence>
                </div>
            </div>
            <div className="cardTextLower">  {/* more condtional redering for scoring system*/}
                {myPlay ? <>Hand Total: {myPlay[0]}</> : <></>}
                {myPlay[1] !== myPlay[0] && <> or {myPlay[1]}</>}
                {myPlay[1] > 21 && <li className="busted">You bust!</li>}
                {score > 21 && <li className="busted"> You score {score} points</li> /* If a big score then animate the text */}
                {(score > 1 && score < 22) && <li> You score {score} points</li>}

                {total ? <li>Your Total = {total} points</li> : <li>0 points</li> /* Update user on scores*/}


                {highScore ? <li>Your High Score = {highScore} points</li> : <li>No High Score found</li>}
                {highScore ? <button className="dealMe" onClick={(e) => handleClearHighScore(e)}>Clear HighScore</button> : <></>}
            </div>
        </div>
    )
}

export default TwentyOne