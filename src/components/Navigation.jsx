import Cookies from "js-cookie";
import { Link } from "react-router-dom";
const Navigation = () => {
  const cookie = Cookies.get('token');
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {cookie && <Link to="/profile">Profile</Link>}
      {!cookie && <Link to="/login">Login</Link>}
      {!cookie && <Link to="/register">Register</Link>}
    </nav>
  )
};

export default Navigation;