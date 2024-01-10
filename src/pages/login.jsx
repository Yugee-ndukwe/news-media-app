// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login (){
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    // Retrieve user information from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === loginData.username && storedUser.password === loginData.password) {
      alert('Login successful!');
      // Navigate to the forum page upon successful login
      navigate('/forum');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" name="username" value={loginData.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={loginData.password} onChange={handleChange} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};


