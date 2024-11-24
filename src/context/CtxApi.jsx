import { createContext, useState, useEffect } from "react";
import userD from "./data.json"; // We will store all data here

export const CtxApi = createContext();

export const CtxProvider = ({ children }) => {
  // Get users from localStorage if available, otherwise use initial state
  const storedUsers = localStorage.getItem("users");
  const initialUsers = storedUsers ? JSON.parse(storedUsers) : userD.users;

  const [users, setUsers] = useState(initialUsers);

  // Get roles from localStorage if available, otherwise use initial state
  const storedRoles = localStorage.getItem("roles");
  const initialRoles = storedRoles ? JSON.parse(storedRoles) : userD.roles;

  const [roles, setRoles] = useState(initialRoles);

  // Persist users to localStorage whenever the users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Persist roles to localStorage whenever the roles state changes
  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  // Add a new role (helper function for external use if needed)
  const addRole = (roleName, permissions) => {
    const newRole = {
      id: roles.length + 1, // Auto-generate a new ID
      name: roleName,
      permissions,
    };
    const updatedRoles = [...roles, newRole];
    setRoles(updatedRoles);
  };

  // Delete a role (optional helper)
  const deleteRole = (roleId) => {
    const updatedRoles = roles.filter((role) => role.id !== roleId);
    setRoles(updatedRoles);
  };

  // Edit a user's tasks (helper function)
  const editUserTasks = (userId, newTasks) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, task: newTasks };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  // Delete a specific task from a user (helper function)
  const deleteUserTask = (userId, taskToDelete) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          task: user.task.filter((task) => task !== taskToDelete),
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  // Edit a user's requests (helper function)
  const editUserRequests = (userId, newRequest) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, request: newRequest };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  // Delete a specific request from a user (helper function)
  const deleteUserRequest = (userId, requestToDelete) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          request: user.request !== requestToDelete ? user.request : "",
        };
      }
      return user;
    });
    setUsers(updatedUsers);
  };
  const [currentUser, setCurrentType] = useState("");
  function setAuthDetails(current) {
    console.log("got this type", current.type);
    setCurrentType(current.type);
  }

  return (
    <CtxApi.Provider
      value={{
        users,
        setUsers,
        roles,
        currentUser,
        setRoles,
        addRole, // Exposing addRole to other components
        deleteRole, // Exposing deleteRole to other components
        editUserTasks, // Exposing editUserTasks to other components
        deleteUserTask, // Exposing deleteUserTask to other components
        editUserRequests, // Exposing editUserRequests to other components
        deleteUserRequest, // Exposing deleteUserRequest to other components
        setAuthDetails, //for the login page
      }}
    >
      {children}
    </CtxApi.Provider>
  );
};
