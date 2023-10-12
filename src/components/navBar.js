import { Link } from 'react-router-dom'
import './navBar.css'

const NavBar = () => {
    return (
        <div className="navBody">
        <div className="nav-containter"> 
        <Link to='/' className = "navBut"><span className='linkN'> Home</span></Link>
        <Link to='/TwentyOne' className = "navBut"><span className='linkN'> 21 Game</span></Link>
        <Link to='/DealTest' className = "navBut"><span className='linkN'> Deal Test</span></Link>
        </div>
        </div>
    )
}
export default NavBar