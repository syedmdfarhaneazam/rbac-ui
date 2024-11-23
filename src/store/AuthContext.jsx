import { createContext, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Create a Provider component
export function AuthProvider({ children }) {
  const [authDetails, setAuthDetails] = useState(null); // State to store login details
  //using separate useState to update context for efficiency
  return (
    <AuthContext.Provider value={{ authDetails, setAuthDetails }}>
      {children}
    </AuthContext.Provider>
  );
}
