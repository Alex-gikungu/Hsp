import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
    return (
      <nav className="navbar">
        <h1>Medical Records System</h1>
        <div className="actions">
          <span>Admin</span>
          <button className="logout-btn">Logout</button>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  
