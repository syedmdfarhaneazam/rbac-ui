import React, { useContext, useState } from 'react';
import { CtxApi } from './context/CtxApi';
import './login.css';

export default function Login({ onLoginSuccess }) {
    const { setAuthDetails } = useContext(CtxApi); // Set state function from context
  const [current, setCurrent] = useState({
    email: "",
    password: "",
      type: "", // For the radio input
  });

  function handleSubmit(event) {
      event.preventDefault(); // Prevents page reload

      // Validation
      if (!current.type) {
      alert(
          "Please select a user type before proceeding (Admin / Developer / Client)."
      );
      return;
    }
    if (!current.email || !current.password) {
        alert("Please fill in all fields completely.");
      return;
    }

      // Set AuthContext and notify parent
    setAuthDetails(current);
      console.log("Successfully stored in context:", current); // Debugging log
      onLoginSuccess(); // Notify parent to switch to App.jsx
  }

  function handleInput(identity, value) {
    setCurrent((prevVal) => ({ ...prevVal, [identity]: value }));
  }

  return (
      <div className="login">
          <div className="form sign-in">
              <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
                  <label>
                      <span>UserName</span>
                      <input
                          type="text"
                          name="email"
                          value={current.email}
                          onChange={(e) => handleInput("email", e.target.value)}
                          required
                      />
                  </label>
                  <label>
                      <span>Password</span>
                      <input
                          type="password"
                          name="password"
                          value={current.password}
                          onChange={(e) => handleInput("password", e.target.value)}
                          required
                      />
                  </label>
                  <div>
                      <input
                          type="radio"
                          id="admin"
                          name="type"
                          value="Admin"
                          onChange={(e) => handleInput("type", e.target.value)}
                      />
                      <label htmlFor="admin">Administrator</label>

                      <input
                          type="radio"
                          id="developer"
                          name="type"
                          value="Developer"
                          onChange={(e) => handleInput("type", e.target.value)}
                      />
                      <label htmlFor="developer">Developer</label>

                      <input
                          type="radio"
                          id="client"
                          name="type"
                          value="Client"
                          onChange={(e) => handleInput("type", e.target.value)}
                      />
                      <label htmlFor="client">Client</label>
                  </div>
                  <button className="submit" type="submit">
                      Sign In
                  </button>
              </form>
      </div>
    </div>
  );
}
