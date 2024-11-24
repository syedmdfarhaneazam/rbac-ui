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
        </CtxProvider>
    );
}
