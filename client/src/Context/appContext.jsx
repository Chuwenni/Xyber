import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "./ToastContext";

const appContext = createContext();

export const AppContext = ({ children }) => {

  const server = import.meta.env.VITE_SERVER;

  const [user, setUser] = useState({
    isLogin: false
  });

  const {showToast} = useToast();

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const response = await axios.get(`${server}/getImage`,
          {
            withCredentials: true
          }
        );

        setUser(response.data.user);

      } catch (error) {
        setUser({ isLogin: false });
        if (error.response) {
          switch (error.response.status) {
            case 401: showToast(error.response.data.message, "warning");
              break;
            case 403: showToast("Please Login First.", "error");
              break;
            case 404: showToast("User not found.", "error");
              break;
            case 500: showToast("Internal server error.", "error");
              break;
          }
        }
      }
    };

    

    fetchUser();
  }, []);

  return (
    <appContext.Provider value={{ user, server }}>
      {children}
    </appContext.Provider>
  );
};

export const useApp = () => {

  const context = useContext(appContext);

  if (!context) {
    throw new Error("useApp must be used inside AppContext");
  }

  return context;
};