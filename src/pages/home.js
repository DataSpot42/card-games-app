import { useNavigate } from "react-router-dom"
import './cardGames.css'


const Home=() => {
    const navigate = useNavigate();
    

    return (
        <div className="cardText">
            <p>Card Games App</p>
            <p>New games will be added over time, for now try 21!</p>
            <button className="dealMe" onClick={()=> navigate('/TwentyOne')}>21 Game</button>
            
            <li>Click Deal to take 2 cards, take more if you wish</li>
            <li>Near as you dare to 21? Press STICK to save score</li>
            <li>Keep dealing until you run out of cards to get high score</li>
        </div>
    )
}
export default Home