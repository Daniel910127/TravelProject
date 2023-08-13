import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

export const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const navigate = useNavigate();
  const [id, setid] = useState(() => {
    const storedid = sessionStorage.getItem('id');
    if (storedid) {
      return JSON.parse(storedid);
    } else {
      return null;
    }
  });
  const [account, setaccount] = useState(() => {
    const storedaccount = sessionStorage.getItem('account');
    if (storedaccount) {
      return JSON.parse(storedaccount);
    } else {
      return null;
    }
  });
  const [username, setusername] = useState(() => {
    const storedusername = sessionStorage.getItem('username');
    if (storedusername) {
      return JSON.parse(storedusername);
    } else {
      return null;
    }
  });
    const [email, setemail] = useState(() => {
    const storedusername = sessionStorage.getItem('email');
    if (storedusername) {
      return JSON.parse(storedusername);
    } else {
      return null;
    }
  });
  const [access, setaccess] = useState(() => {
    const storedaccess = sessionStorage.getItem('access');
    if (storedaccess) {
      return JSON.parse(storedaccess);
    } else {
      return null;
    }
  });
  const [refresh, setrefresh] = useState(() => {
    const storedrefresh = sessionStorage.getItem('refresh');
    if (storedrefresh) {
      return JSON.parse(storedrefresh);
    } else {
      return null;
    }
  });
  const login = (id,account,username,email,access,refresh) => {
    sessionStorage.setItem('id', JSON.stringify(id));
    sessionStorage.setItem('account', JSON.stringify(account));
    sessionStorage.setItem('username', JSON.stringify(username));
    sessionStorage.setItem('email', JSON.stringify(email));
    sessionStorage.setItem('access', JSON.stringify(access));
    sessionStorage.setItem('refresh', JSON.stringify(refresh));
    setid(id);
    setaccount(account);
    setusername(username);
    setemail(email);
    setaccess(access);
    setrefresh(refresh);
  };

  const logout = () => {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('account');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('refresh');
    setid(null);
    setaccount(null);
    setusername(null);
    setemail(null);
    setaccess(null);
    setrefresh(null);
    navigate('/'); 
  };

  return (
    <SessionContext.Provider value={{ id,account,username,email,access,refresh, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

