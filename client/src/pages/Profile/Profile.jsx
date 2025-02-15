import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import "./Profile.css"; // ✅ Import CSS

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div className="profile-loading">Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className="profile-error">
        You need to be logged in to see this.{" "}
        <Link to="/login" className="profile-link">
          Log in
        </Link>{" "}
        or{" "}
        <Link to="/signup" className="profile-link">
          Sign up
        </Link>{" "}
        to access this page.
      </h4>
    );
  }

  return (
    <main className="profile-container">
      <div className="profile-wrapper">
        <h2 className="profile-header">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
        <div className="profile-info">
          <h3 className="profile-username">{user.username}</h3>
        </div>
      </div>
    </main>
  );
};

export default Profile;