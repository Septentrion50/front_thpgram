import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "redux/actions/authActions";

const Navigation = () => {
  const history = useHistory();
  const cookie = Cookies.get('token');
  const dispatch = useDispatch();

  const logMeOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/');
  }

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {cookie && <Link to="/profile">Profile</Link>}
      {cookie && <Link to="#" onClick={e => logMeOut(e)}>Logout</Link>}
      {!cookie && <Link to="/login">Login</Link>}
      {!cookie && <Link to="/register">Register</Link>}
    </nav>
  )
};

export default Navigation;