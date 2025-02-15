import { Link, useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    navigate('/'); // Redirect to the home screen
    Auth.logout();
  };

  return (
    <header
      style={{
        backgroundColor: '#F5F5F0', // Ivory background
        color: '#3D3D3D', // Dark Gray text
        marginBottom: '2rem',
        padding: '1.5rem 0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderBottom: '2px solid #C4B454', // Soft Gold border
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div>
          <Link
            to="/"
            style={{
              color: '#3D3D3D', // Dark Gray for text
              textDecoration: 'none',
            }}
          >
            <h1
              style={{
                margin: '0',
                fontSize: '2.2rem',
                fontWeight: 'bold',
                transition: 'color 0.3s ease', // Smooth transition for hover
              }}
              onMouseOver={(e) => (e.target.style.color = '#C4B454')} // Gold on hover
              onMouseOut={(e) => (e.target.style.color = '#3D3D3D')} // Dark Gray text
            >
              Nexus
            </h1>
          </Link>
          <p
            style={{
              margin: '0.5rem 0 0',
              fontSize: '1rem',
              color: '#708090', // Light Slate Gray for subtitle
            }}
          >
            The Future For All (App Currently Under Development)
          </p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link
                to="/me"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#F5F5F0', // Ivory button
                  color: '#3D3D3D', // Dark Gray text
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  margin: '0 0.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '1px solid #C4B454', // Soft Gold border
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray
                  e.target.style.color = '#F5F5F0'; // Ivory
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#F5F5F0';
                  e.target.style.color = '#3D3D3D';
                }}
              >
                Profile
              </Link>
              <button
                onClick={logout}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#F5F5F0',
                  color: '#3D3D3D',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  border: '1px solid #C4B454',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  margin: '0 0.5rem',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#3D3D3D';
                  e.target.style.color = '#F5F5F0';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#F5F5F0';
                  e.target.style.color = '#3D3D3D';
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#F5F5F0',
                  color: '#3D3D3D',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  margin: '0 0.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '1px solid #C4B454',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#3D3D3D';
                  e.target.style.color = '#F5F5F0';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#F5F5F0';
                  e.target.style.color = '#3D3D3D';
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#F5F5F0',
                  color: '#3D3D3D',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  border: '1px solid #C4B454',
                  textDecoration: 'none',
                  margin: '0 0.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#3D3D3D';
                  e.target.style.color = '#F5F5F0';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#F5F5F0';
                  e.target.style.color = '#3D3D3D';
                }}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;