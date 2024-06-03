import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css';
import Header from './Header';
import Footer from './Footer';
import { login } from '../services/login';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    const data = {
      username: username,
      password: password
    };

    try {
      const response = await login(data);
      console.log(response);
  
      // Assuming successful login if response contains a message
      if (response.data && response.data.message === 'Login successful') {
        // Redirect to /landing page upon successful login
        setLoggedIn(true); // Set login state to true
      } else {
        // Handle login failure
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      // Handle login error
    }
  };

  // Redirect to /landing page if loggedIn state is true
  if (loggedIn) {
    return <Navigate to="/landing" />;
  }

  return (
    <div className='home-page'>
      <Header />

      <div className='login-container'>
        <form className='login-form'>
          <label htmlFor="username">Username</label><br/>
          <input id="username" type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
          <label htmlFor="password">Password</label><br/>
          <input id="password" type='password' placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
          <button className='login-button' type='button' onClick={handleLogin}>Login</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
