import { useNavigate } from "react-router-dom"
import './cardGames.css'


const Home=() => {
    const navigate = useNavigate();
    

    return (
        <div className="cardText">
            <p>Card Games App</p>
            <p>New games will be added over time, for now try 21!</p>
            <button className="dealMe" onClick={()=> navigate('/TwentyOne')}>21 Game</button>
            
            <li>Play with all 52 cards to get a high score</li>
            
        </div>
    )
}
export default Home