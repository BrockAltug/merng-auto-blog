import { useLocation, useNavigate } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaInstagram, FaArrowLeft } from 'react-icons/fa'; // Import social media icons

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer
      style={{
        backgroundColor: '#F5F5F0', // Ivory background
        color: '#2F4F4F', // Slate Gray text
        marginTop: '2rem',
        padding: '2rem 0',
        boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
        borderTop: '2px solid #C4B454', // Soft Gold border
      }}
    >
      <div
        className="container"
        style={{
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {location.pathname !== '/' && (
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-block',
              backgroundColor: '#FFFFFF', // White background by default
              color: '#3D3D3D', // Dark Gray text
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              border: '1px solid #C4B454', // Soft Gold border
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray background on hover
              e.target.style.color = '#F5F5F0'; // White text on hover
              e.target.querySelector('svg').style.fill = '#F5F5F0'; // Make icon white on button hover
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#FFFFFF'; // White background when not hovered
              e.target.style.color = '#3D3D3D'; // Dark Gray text when not hovered
              e.target.querySelector('svg').style.fill = '#3D3D3D'; // Revert icon color to dark gray
            }}
          >
            <FaArrowLeft
              style={{
                color: '#3D3D3D',
                pointerEvents: 'none', // Disable hover effect on the icon itself
              }}
            />
          </button>
        )}
        <h4
          style={{
            margin: '0 0 1rem',
            fontSize: '1.25rem',
            color: '#3D3D3D', // Dark Gray for text
            fontWeight: 'bold',
          }}
        >
          Nexus: Revolutionizing Connectivity
        </h4>
        <p
          style={{
            margin: '0 0 1.5rem',
            fontSize: '1rem',
            color: '#2F4F4F',
            lineHeight: '1.6',
          }}
        >
          Our mission is to unify the digital experience by creating a seamless,
          all-in-one platform for communication, connection, and collaboration. Nexus strives
          to empower individuals and communities worldwide to engage effortlessly and stay connected, 
          embodying innovation and inclusivity at every step.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            fontSize: '1.5rem',
          }}
        >
          <button
            onClick={() => window.open('https://twitter.com', '_blank')}
            style={{
              backgroundColor: '#FFFFFF', // White background by default
              color: '#3D3D3D', // Dark Gray text
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              border: '1px solid #C4B454', // Soft Gold border
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray background on hover
              e.target.style.color = '#F5F5F0'; // White text on hover
              e.target.querySelector('svg').style.fill = '#F5F5F0'; // Make icon white on button hover
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#FFFFFF'; // White background when not hovered
              e.target.style.color = '#3D3D3D'; // Dark Gray text when not hovered
              e.target.querySelector('svg').style.fill = '#3D3D3D'; // Revert icon color to dark gray
            }}
          >
            <FaTwitter
              style={{
                color: '#3D3D3D',
                pointerEvents: 'none', // Disable hover effect on the icon itself
              }}
            /> 
          </button>
          <button
            onClick={() => window.open('https://www.linkedin.com', '_blank')}
            style={{
              backgroundColor: '#FFFFFF', // White background by default
              color: '#3D3D3D', // Dark Gray text
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              border: '1px solid #C4B454', // Soft Gold border
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray background on hover
              e.target.style.color = '#F5F5F0'; // White text on hover
              e.target.querySelector('svg').style.fill = '#F5F5F0'; // Make icon white on button hover
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#FFFFFF'; // White background when not hovered
              e.target.style.color = '#3D3D3D'; // Dark Gray text when not hovered
              e.target.querySelector('svg').style.fill = '#3D3D3D'; // Revert icon color to dark gray
            }}
          >
            <FaLinkedin
              style={{
                color: '#3D3D3D',
                pointerEvents: 'none', // Disable hover effect on the icon itself
              }}
            />
          </button>
          <button
            onClick={() => window.open('https://instagram.com', '_blank')}
            style={{
              backgroundColor: '#FFFFFF', // White background by default
              color: '#3D3D3D', // Dark Gray text
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              border: '1px solid #C4B454', // Soft Gold border
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#3D3D3D'; // Dark Gray background on hover
              e.target.style.color = '#F5F5F0'; // White text on hover
              e.target.querySelector('svg').style.fill = '#F5F5F0'; // Make icon white on button hover
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#FFFFFF'; // White background when not hovered
              e.target.style.color = '#3D3D3D'; // Dark Gray text when not hovered
              e.target.querySelector('svg').style.fill = '#3D3D3D'; // Revert icon color to dark gray
            }}
          >
            <FaInstagram
              style={{
                color: '#3D3D3D',
                pointerEvents: 'none', // Disable hover effect on the icon itself
              }}
            />
          </button>
        </div>
        <p
          style={{
            marginTop: '1.5rem',
            fontSize: '0.875rem',
            color: '#708090', // Light Slate Gray
          }}
        >
          &copy; {new Date().getFullYear()} Nexus. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;