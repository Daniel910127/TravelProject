import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('../api/views/login/', { account, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      })
      .catch(error => console.log(error));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>account:</label>
          <input type="text" value={account} onChange={(event) => setAccount(event.target.value)} />
        </div>
        <div>
          <label>password:</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
