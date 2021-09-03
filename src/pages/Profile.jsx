import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "redux/actions/authActions";

const Profile = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user) || {
    attributes: "loading...",
  };
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const changeInfos = (e) => {
    e.preventDefault();
    const infos = {
      user: {
        username,
        firstname,
        lastname,
      },
    };
    dispatch(updateUser(infos));
    setIsEditing(false);
  };

  return (
    <>
      <h1>Profile</h1>
      {isEditing ? (
        <form className="edit-profile" onSubmit={(e) => changeInfos(e)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={user.attributes.username || "Username"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder={ user.attributes.firstname || "Firstname"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder={ user.attributes.lastname || "Lastname"}
            />
          </div>
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <div className="profile">
          <p>Email: {user.attributes.email}</p>
          <p>Username: {user.attributes.username}</p>
          <p>Firstname: {user.attributes.firstname}</p>
          <p>Lastname: {user.attributes.lastname}</p>
        </div>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Abort" : "Edit infos"}
      </button>
    </>
  );
};

export default Profile;
