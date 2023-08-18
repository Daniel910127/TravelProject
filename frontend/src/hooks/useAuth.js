import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

const useAuth = () => {
  //   const [user, setUser] = useState(null);
  const { login, logout } = useUser();
  let isAuthenticated = false;

  const refreshTokens = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axios.post("/api/refresh", { refreshToken });
      const { access } = response.data;
      login(
        localStorage.getItem("userinfo"),
        access,
        localStorage.getItem("refreshToken")
      );
      isAuthenticated = true;
    } catch (error) {
      console.error("Error refreshing tokens:", error);
      logout();
      isAuthenticated = false;
    }
  };

    const token = localStorage.getItem("accessToken");

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        // Token has expired, clear tokens and user data
        refreshTokens();
      } else {
        console.log('not expired')
        isAuthenticated=true;
      }
    }
 

  //   const login = async (accessToken, refreshToken) => {
  //     localStorage.setItem('token', accessToken);
  //     localStorage.setItem('refreshToken', refreshToken);
  //     const decodedToken = jwtDecode(accessToken);
  //     setUser(decodedToken);
  //   };

  //   const logout = () => {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('refreshToken');
  //     setUser(null);
  //   };
  console.log('inside ' ,isAuthenticated)
  return isAuthenticated ;
};

export default useAuth;
