// Authentication Context Provider
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children}) => {
    const [user ,setUser] = useState(null);
    const [token , setToken] = useState(null);

    useEffect(() => {
        const storeUser = localStorage.getItem("user");
        const storeToken = localStorage.getItem("token");

        if (storeToken && storeUser){
            setToken(storeToken);
            setUser(JSON.parse(storeUser));
    }
    },[])

    const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

 return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
