import React, { useContext, useState } from 'react';
import { CtxApi } from './context/CtxApi';
import './login.css';

export default function Login({ onLoginSuccess }) {
    const { users, setAuthDetails } = useContext(CtxApi); // Set state function from context
    const [current, setCurrent] = useState("");

  function handleSubmit(event) {
      event.preventDefault(); // Prevents page reload


      //validations here
      if (!current) {
          alert("Please fill in all fields completely.");
      return;
    }
      if (!users.some(user => user.name === current)) {
          alert("You are not an existing user you should contact the admin to get your entry as existing user");
          return;
      }

      // Set AuthContext and notify parent
    setAuthDetails(current);
      console.log("Successfully stored in context:", current); // Debugging log
      onLoginSuccess(); // Notify parent to switch to App.jsx
  }

    function handleInput(value) {
        setCurrent(value);
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
                          name="name"
                          value={current.name}
                          onChange={(e) => handleInput(e.target.value)}
                          required
                      />
                  </label>
                  <label>
                      <span>Password</span>
                      <input
                          type="password"
                          name="password"
                          value={current.password}
                          //onChange={(e) => handleInput("password", e.target.value)}
                          required
                      />
                  </label>
                  <button className="submit" type="submit">
                      Sign In
                  </button>
              </form>
      </div>
    </div>
  );
}
