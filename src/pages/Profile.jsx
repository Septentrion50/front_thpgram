import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "redux/actions/authActions";

const Profile = () => {
  const [fetchOnce, setFetchOnce] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user) || {attributes: 'loading...'};

  useEffect(() => {
    if (!fetchOnce) {
      dispatch(getUser(Cookies.get("id")));
      setFetchOnce(true);
    }
  }, [fetchOnce, dispatch]);

  return (
    <>
      <div className="profile">
        <h1>Profile</h1>
        <p>Email: {user.attributes.email}</p>
      </div>
    </>
  );
};

export default Profile;
