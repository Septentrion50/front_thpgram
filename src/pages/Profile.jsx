const Profile = ({ user }) => {

  return(
    <>
      <div className="profile">
        <h1>Profile</h1>
        <p>Email: {user.attributes.email}</p>
      </div>
    </>
  )
};

export default Profile;