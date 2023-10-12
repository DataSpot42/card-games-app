import CardDealer from "../components/cardDealer"
import { useState, useEffect } from "react";
import MyTotal from "../components/twentyOneTotal";

const TwentyOne = () => {
    
    const [deck, setDeck] = useState()
    const [myHand, setMyHand] = useState([])
    const [myPlay, setMyPlay] = useState([])
    const [bust,setBust] = useState(false)
    useEffect(() => {
        const fetchDeck = async () => {
            let shuffledDeck = CardDealer()
            let ourDeck = await JSON.parse(shuffledDeck);
            console.log(ourDeck)
            setDeck(ourDeck)
            setMyHand([])
        }
        fetchDeck()
    }, [])

    const handleDealme = async (e) => {
        e.preventDefault()
        let dealt = [deck[0], deck[1]]
        setMyHand(dealt)
        let whatsLeft = deck
        whatsLeft.splice(0, 2);
        setDeck(whatsLeft)
        console.log(dealt)
        let sum = MyTotal(dealt)
        console.log(sum)
        if (sum[0]>21 && sum[1]>21) {setBust(true)}
        setMyPlay(sum)
        
        // setMyTotal(sum)
        
    }
    const handleAnotherCard = async (e) => {
        e.preventDefault()     
        let newCard = deck[0]
        let newHand = ([...myHand,newCard])
        setMyHand(newHand)
        let whatsLeft = deck
        whatsLeft.splice(0, 1);
        setDeck(whatsLeft)
        console.log(myHand)
        let sum = MyTotal(newHand)
        console.log(sum)
        if (sum[0]>21 && sum[1]>21) {setBust(true)}
        setMyPlay(sum)

        // let oneMoreCard = myHand  
        // oneMoreCard.push(deck[0])        
        // let whatsLeft = deck
        // whatsLeft.splice(0, 1);
        // setDeck(whatsLeft)
        // setMyHand(oneMoreCard)
        // console.log(myHand)
        // console.log(deck)

    }

    console.log(deck)
    console.log(myHand)
    

    return (
        <div>
            <div className="cardDeal">

                {/* {deck ? deck.map((deck, key) =>
                    <div key={deck.key}>
                        <img src={`https://deckofcardsapi.com/static/img/${deck.card}.png`} height={"100px"} width={"60px"} alt={deck.card} />
                    </div>)
                    : <p>Loading</p>} */}

            </div>
            <div>
                <button className="dealme" onClick={(e) => handleDealme(e)}>Deal my Hand</button>
                <button className="dealme" onClick={(e) => handleAnotherCard(e)}>Give me One More</button>
            </div>
            <div className="cardDeal">
                {myHand ? myHand.map((myHand, key) =>
                    <div key={myHand.key}><img src={`https://deckofcardsapi.com/static/img/${myHand.card}.png`} height={"100px"} width={"60px"} alt={myHand.card} />
                    </div>)
                    : <p>Awaiting Deal</p>}
            </div>
            <div>
                {myPlay ? <p>Total: {myPlay[0]}</p> : <p></p>}
                {myPlay[1] != myPlay[0] && <p> or {myPlay[1]}</p>}
                {myPlay[1] > 21 && <p>You bust!</p>}
                {myPlay[1] === 21 && <p>21! wow!</p>}
            </div>
        </div>
    )
}
export default TwentyOne