import { useState, useContext } from "react";

import { AuthContext } from "./store/AuthContext"; //to pass on the current user details

export default function Login({ onLogin }) {
  const { setAuthDetails } = useContext(AuthContext);
  const [current, setCurrent] = useState({
    email: "",
    password: "",
    type: "",
  });
  const [isNew, setIsNew] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (isNew && !current.type) {
      alert(
        "Please select the user type before you proceed (admin / developer / client)",
      );
      return;
    }
    if (!current.email || !current.password) {
      alert("Please completely enter all fields");
      return;
    }
    setAuthDetails(current);
    onLogin();
  }

  function handleInput(identity, value) {
    setCurrent((prevVal) => ({ ...prevVal, [identity]: value }));
  }

  function handleLogIn() {
    setIsNew((prev) => !prev);
  }

  return (
    <div style={{ position: "relative", height: "460px", width: "100%" }}>
      <div className={`login ${isNew ? "active" : "hidden"}`}>
        <form onSubmit={handleSubmit}>
          <input
            type="radio"
            id="admin"
            name="type"
            value="Admin"
            onChange={(e) => handleInput("type", e.target.value)}
          />
          <label htmlFor="admin" className="radio-label">
            Administrator
          </label>

          <input
            type="radio"
            id="developer"
            name="type"
            value="Developer"
            onChange={(e) => handleInput("type", e.target.value)}
          />
          <label htmlFor="developer" className="radio-label">
            Developer
          </label>

          <input
            type="radio"
            id="common"
            name="type"
            value="Common"
            onChange={(e) => handleInput("type", e.target.value)}
          />
          <label htmlFor="common" className="radio-label">
            Client
          </label>

          <input
            type="text"
            name="name"
            placeholder="only lower case and no space"
            required
            onChange={(e) => handleInput("email", e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => handleInput("password", e.target.value)}
          />

          <button type="submit">Sign-up</button>
        </form>
        <button onClick={handleLogIn}>Already Registered?</button>
      </div>
      <div className={`login ${!isNew ? "active" : "hidden"}`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="text"
            name="name"
            placeholder="only lower case and no space"
            required
            onChange={(e) => handleInput("email", e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => handleInput("password", e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <button onClick={handleLogIn}>New to us?</button>
      </div>
    </div>
  );
}
