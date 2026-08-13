import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useErrorHandler} from "../utils/useErrorHandler.js"
import { useToast } from "./ToastContext";

const appContext = createContext();

export const AppContext = ({ children }) => {

  const server = import.meta.env.VITE_SERVER;

  const [user, setUser] = useState({
    isLogin: false
  });

  const { handle } = useErrorHandler();
  
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
      handle(error, "toast")
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <appContext.Provider value={{ user, fetchUser, setUser, server }}>
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