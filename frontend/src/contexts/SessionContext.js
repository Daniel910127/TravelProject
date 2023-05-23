import React, { createContext, useContext, useState } from 'react';

export const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [a_Id, setaId] = useState(() => {
    const storeda_ID = sessionStorage.getItem('a_Id');
    if (storeda_ID) {
      return JSON.parse(storeda_ID);
    } else {
      return null;
    }
  });
  const [m_Id, setmId] = useState(() => {
    const storedm_Id = sessionStorage.getItem('m_Id');
    if (storedm_Id) {
      return JSON.parse(storedm_Id);
    } else {
      return null;
    }
  });
  const [a_Account, setaccount] = useState(() => {
    const storedAccount = sessionStorage.getItem('a_Account');
    if (storedAccount) {
      return JSON.parse(storedAccount);
    } else {
      return null;
    }
  });
  // const [a_Password, setpassword] = useState(() => {
  //   const storedPassword = sessionStorage.getItem('a_Password');
  //   if (storedPassword) {
  //     return JSON.parse(storedPassword);
  //   } else {
  //     return null;
  //   }
  // });
  const [a_Level, setLevel] = useState(() => {
    const storedLevel = sessionStorage.getItem('a_Level');
    if (storedLevel) {
      return JSON.parse(storedLevel);
    } else {
      return null;
    }
  });
  const login = (a_Id,m_Id,a_Account,a_Level) => {
    sessionStorage.setItem('a_Id', JSON.stringify(a_Id));
    sessionStorage.setItem('m_Id', JSON.stringify(m_Id));
    sessionStorage.setItem('a_Account', JSON.stringify(a_Account));
    // sessionStorage.setItem('a_Password', JSON.stringify(a_Password));
    sessionStorage.setItem('a_Level', JSON.stringify(a_Level));
    setaId(a_Id);
    setmId(m_Id);
    setaccount(a_Account);
    // setpassword(a_Password);
    setLevel(a_Level);
  };

  const logout = () => {
    sessionStorage.removeItem('a_Id');
    sessionStorage.removeItem('m_Id');
    sessionStorage.removeItem('a_Account');
    // sessionStorage.removeItem('a_Password');
    sessionStorage.removeItem('a_Level');
    setaId(null);
    setmId(null);
    setaccount(null);
    // setpassword(null);
    setLevel(null);
  };

  return (
    <SessionContext.Provider value={{ a_Id,m_Id,a_Account,a_Level, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
