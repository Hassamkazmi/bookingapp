import { Link } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
       <Link to = '/'  className="linkstyle1"> <span className="logo">Booking App</span></Link>
        <div className="navItems">
          
        </div>
      </div>
    </div>
  )
}

export default Navbar