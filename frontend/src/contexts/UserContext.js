import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userinfo, setUserinfo] = useState(() => {
    const stored_userinfo = localStorage.getItem("userinfo");
    if (stored_userinfo) {
      return JSON.parse(stored_userinfo);
    } else {
      return null;
    }
  });

  const login = (userinfo_data, access, refresh) => {
    localStorage.setItem("userinfo", JSON.stringify(userinfo_data));
    localStorage.setItem("jwtToken", access);
    localStorage.setItem("refreshToken", refresh);
    setUserinfo(userinfo_data);
  };

  const logout = () => {
    localStorage.removeItem("userinfo");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");
    setUserinfo(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ userinfo, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
