import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
        <Link to='/' className = "show"><span className='linkN'> Home</span></Link>
        <Link to='/TwentyOne' className = "show"><span className='linkN'> 21 Game</span></Link>
        <Link to='/DealTest' className = "show"><span className='linkN'> Deal Test</span></Link>
        </div>
    )
}
export default NavBar