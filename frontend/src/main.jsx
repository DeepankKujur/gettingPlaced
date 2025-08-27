import "./index.css";
import axios from "axios";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

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
        user,
        setUser,
        checkAuth,
        isAuthorized,
        setIsAuthorized,
      }}
    >
      {!loading && <App />}
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);
