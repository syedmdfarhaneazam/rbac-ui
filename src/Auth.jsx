import { useState } from "react";
import Login from './Login.jsx';
import App from './App.jsx';
import { CtxProvider } from "./context/CtxApi.jsx";

export default function Auth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
    //creatuing a login funcitonality 
    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // Update state when login is successful
    };
    // we will use fragment sing we have no css in auth
    return (
        <CtxProvider>
            {!isLoggedIn ? (
                <Login onLoginSuccess={handleLoginSuccess} /> // propdrilling handler to Login component
            ) : (
                <App /> // showing conditionally 
            )}
            <footer>
    <p>Website made by <strong>Syed Md Farhan E Azam</strong></p>
    <div>
      <a href="https://github.com/syedmdfarhaneazam" target="_blank">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons/icons/github.svg" alt="GitHub" /> GitHub
      </a>
      <a href="https://www.linkedin.com/in/syed-md-farhan-e-azam-b21043279/" target="_blank">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons/icons/linkedin.svg" alt="LinkedIn" /> LinkedIn
      </a>
      <a href="https://leetcode.com/u/SYED_MD_FARHAN_E_AZAM/" target="_blank">
        <img src="https://cdn.jsdelivr.net/npm/simple-icons/icons/leetcode.svg" alt="LeetCode" /> LeetCode
      </a>
    </div>
  </footer>
        </CtxProvider>
    );
}
