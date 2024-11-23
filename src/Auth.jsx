import { useState } from 'react';
import Login from './Login';
import App from './App';
import { AuthProvider } from './store/AuthContext'; //importing the AuthContext that i created

export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  return (
<AuthProvider>    
    <div>
      {isLoggedIn ? (
        <App /> // Render the App component if logged in
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} /> // Pass a callback to Login
      )}
    </div></AuthProvider>
  );
}

