import Auth from "../../utils/auth";
import Welcome from "../../components/Home/Welcome";
import Dashboard from "../../components/Home/Dashboard";
import "./Home.css";

const Home = () => {
  if (Auth.loggedIn()) {
    return <Dashboard />;
  }
  return <Welcome />;
};

export default Home;