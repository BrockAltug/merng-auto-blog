import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      style={{
        backgroundColor: '#F5F5F0', // Ivory background
        color: '#2F4F4F', // Slate Gray text
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#3D3D3D', // Dark Gray for heading
        }}
      >
        Oops!
      </h1>
      <p
        style={{
          fontSize: '1.2rem',
          marginBottom: '1rem',
          color: '#708090', // Light Slate Gray for subtitle
        }}
      >
        Sorry, an unexpected error has occurred.
      </p>
      <p
        style={{
          fontSize: '1rem',
          fontStyle: 'italic',
          color: '#E63946', // Red for error message
        }}
      >
        {error.statusText || error.message}
      </p>
    </div>
  );
}