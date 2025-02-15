import "../../pages/Home/Home.css";
import Auth from "../../utils/auth";

const Dashboard = () => {
  const username = Auth.getProfile().data.username;

  return (
    <main className="home-container">
      <div className="home-card">
        <h1 className="home-title">Welcome back, {username}!</h1>
        <p className="home-subtitle">Manage your profile and stay connected.</p>
        <div>
          <a href="/me" className="home-button">
            View Profile
          </a>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;