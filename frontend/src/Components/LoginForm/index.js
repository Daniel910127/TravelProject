import React, { useState,useContext } from 'react';
import axios from 'axios';
import { Navigate} from 'react-router-dom';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState(null);


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('http://127.0.0.1:8000/api/account-login/', { username, password })
    .then(res => {
        console.log(res.message);
        console.log('登入成功');
        setRedirect(true);
      })
      .catch(err => {
        console.error(err.message);
        setMessage('登入失敗，請檢查帳號密碼是否正確');
      });
  };

  if(redirect){
   return (
        <Navigate to='/home' />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        帳號：
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        密碼：
        <input type="password" value={password} onChange={handlePasswordChange}/>
      </label>
        <button type="submit">Login</button>
      </form>
  );
}

export default Login;
