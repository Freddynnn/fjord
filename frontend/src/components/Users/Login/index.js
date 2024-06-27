import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../../UI/Form/form.css';

function Login({ logIn }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        localStorage.setItem('token', response.data.token);
        logIn(userData);
        
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Error authenticating:', error);
      setError('Incorrect username or password');
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className='form-container'>
      <section className="login-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <header>
            <h2>LOGIN TO YOUR ACCOUNT</h2>
          </header>
              
          <input
            className='username-input'
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

          <div className="password-container">
            <input
              className='password-input'
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <span onClick={togglePasswordVisibility} className="toggle-password">
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                title={showPassword ? "Hide password" : "Show password"} // Text for the tooltip
              />
            </span>
          </div>

            
          
            
          <div className="error-container">
            {error && <span className="error-message">{'* '+error}</span>}
          </div>
          <button className="submit-button" type="submit">Submit</button>
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
