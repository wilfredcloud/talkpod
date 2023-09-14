import { Link } from 'react-router-dom'
import logo from '../assets/talkpod-logo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
    <div className="nav-content">
      <div className="logo">
        <img src={logo} alt="Talkpod Logo" />
      </div>

      <div>
        <a href="#features" >Features</a>
        <a href="#about" className='ml-2'>About</a>
      </div>
      <div className="menu">
        <Link to="/signin"

          className="btn-border"
        >
          Sign In
        </Link>
        <Link to="/signup"
          className="btn-full ml-2"
        >
          Sign Up
        </Link>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
