import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

export const Context = createContext();

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(
        `https://gettingplaced.onrender.com/api/user/public/getuser`,
        { withCredentials: true }
      );
      console.log("User data:", data);
      
      if (data.user) {
        setUser(data.user);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthorized(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
        checkAuth,
      }}
    >
      {!loading && <App />}
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
