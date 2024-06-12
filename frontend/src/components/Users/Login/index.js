import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../UI/Form/form.css';

function Login({ logIn }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a payload with user and password
    const payload = { username: user, password: password };

    try {
      // Send a POST request to your login endpoint on your backend
      const response = await axios.post('http://localhost:3001/login', payload);

      if (response.status === 200) {
        console.log('Authentication successful');
        const userData = response.data.user;
        logIn(userData);
        console.log('Navigating to dashboard');
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Error authenticating:', error);
      setError('Incorrect username or password');
    }
  }

  return (
    <main className='form-container'>
      <section className="login-section">
          <form className="login-form" onSubmit={handleSubmit}>
          <header>
              <h2>LOGIN TO YOUR ACCOUNT</h2>
          </header>
              
              <input
                  maxLength="30"
                  minLength="5"
                  name="user"
                  type="text"
                  id="user"
                  placeholder="Username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  autoComplete="username"
              />
              
              <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
              />
              <div className="error-container">
                {error && <span className="error-message">{'* '+error}</span>}
              </div>
              <button type="submit">Submit</button>
          </form>
      </section>
      <section className="register-section">
          <div className="new">
              <h2>NEW HERE?</h2>
              <h3>Sign up new and discover .......</h3>
              <Link to="/register" className="custom-link">Register here!</Link>
          </div>
      </section>
  </main>
  
  );
}

export default Login;
