import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// NEED CONSISTENT FORM CSS
import '../../UI/Form/form.css';
// import Button from '../../components/button/Button';

function Register({ logIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',

  });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});


  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear previous validation errors for the current input
    setValidationErrors({ ...validationErrors, [name]: '' });

    // Input length checks
    if (name === 'username' && value && (value.length < 5 || value.length > 30)) {
      setValidationErrors({
        ...validationErrors,
        username: 'Username must be between 5-30 characters',
      });
    }

    // specific formatting checks
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{5,}$/;
    if (name === 'password' && value && !passwordRegex.test(value)) {
      setValidationErrors({
        ...validationErrors,
        password: 'Password must contain at least 1 digit and 1 upper case letter',
      });
    }
  };


  // handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Before Axios request');
      const response = await axios.post('${process.env.REACT_APP_API_URL}/register', formData);
      console.log('After Axios request', response);

      // successful registration
      if (response.status === 201) {
        console.log('Registration successful');
        navigate('/login');
      } 
      
      else {
        console.log('Registration failed');
        if (response.status === 400 && response.data && response.data.error) {
          setError(response.data.error);
        } else {
          setError('Username already in use. Please choose a different one or login.');
        }
      }
    } 
    
    // Handle other errors if the request fails
    catch (error) {
      console.error(error);
      // setError('An error occurred while registering.');
      setError('This Username or email already in use');
    }
  };

  return (
    <main className="form-container">
      <section className="register-form">
        <header>
          <h2>Input your info here!</h2>
          <div className="new">
            <h3>Already have an account?</h3>
            <Link to="/login" className="custom-link">
              Log In here!
            </Link>
          </div>
        </header>

        <form onSubmit={handleSubmit}>

          <label htmlFor="user">
            <span className='req-star'> * </span> 
            Username
            {validationErrors.username && (
              <p className="error-message">{validationErrors.username}</p>
            )}
          </label>
          <input
            maxLength="30"
            minLength="5"
            name="username"
            type="text"
            id="user"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <label> 
            <span className='req-star'> * </span> 
            Password 
            {validationErrors.password && (
              <p className="error-message">{validationErrors.password}</p>
            )}
          </label>
          <input
            maxLength="30"
            minLength="5"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        
        {error && <p className="error-message">{error}</p>}
      </section>
    </main>
  );
}

export default Register;
