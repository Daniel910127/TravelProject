import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useSession } from '../../contexts/SessionContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { login } = useSession() || {};

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/account-login/', { username, password });
      console.log(response.data.message);
      console.log(response.data.setredirect);
      if(response.data.setredirect===1){
        setRedirect(true);
        login(response.data.a_Id,response.data.m_Id,response.data.a_Account,response.data.a_Level);
      }else{
        setRedirect(false);
      }
    } catch (err) {
      console.error(err.message);
      setMessage('登入失敗，請檢查帳號密碼是否正確');
    }
    
  };
 
       if (redirect) {
    
    return <Navigate to='/home' />;
    
  }

  return (
    <div class="container">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h2 style={{ textAlign: 'center' }}>登入</h2>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          <span>帳號</span>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          <span>密碼</span>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        {message && <span style={{ color: 'red', textAlign: 'center' }}>{message}</span>}
        <button type="submit" style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          登入
        </button>
      </form>
    </div>
  );
}

export default Login;
