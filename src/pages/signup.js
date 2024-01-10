import React, { useState } from 'react';
import { BasicExample } from '../Component/Navbar/navbar';
import { HeaderNav } from '../header/headernav';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

export function SignUp() {
  const [formData, setFormData] = useState({
    surname: '',
    firstName: '',
    username: '',
    phoneNumber: '',
    gender: '',
    country: '',
    email: '',
    password: '',
  });

  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate form data (you can add more validation logic)
    if (
      (!isLoggingIn && (
        !formData.firstName.trim() ||
        !formData.surname.trim() ||
        !formData.username.trim() ||
        !formData.country.trim() ||
        !formData.password.trim() ||
        !formData.email.trim() ||
        !formData.gender.trim() ||
        !formData.phoneNumber.trim()
      )) ||
      (isLoggingIn && (!formData.username.trim() || !formData.password.trim()))
    ) {
      alert('Please fill in the required field');
      return;
    }
  
    // Display form data
    console.log('Form Data:', formData);
    console.log('Show Welcome Message:', showWelcomeMessage);
  
    // Retrieve users array from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    if (!isLoggingIn) {
      // Sign Up: Check if the username is already taken
      if (users.some(user => user.username === formData.username)) {
        alert('Username is already taken. Please choose another one.');
        return;
      }
  
      // Store user information in the users array
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      // Login: Check if username and password match any stored user
      const matchingUser = users.find(user => user.username === formData.username);
  
      if (matchingUser && matchingUser.password === formData.password) {
        alert('Login successful!');
        setShowWelcomeMessage(true);

        // Set the authenticated user
        setAuthenticatedUser(matchingUser);
  
        // Reset the form after successful login if needed
        setFormData({
          surname: '',
          firstName: '',
          username: '',
          phoneNumber: '',
          gender: '',
          country: '',
          email: '',
          password: '',
        });
  
        // Simulate a delay before navigating (e.g., show welcome message for 3 seconds)
        setTimeout(() => {
          setShowWelcomeMessage(false);
          navigate('/forum');
        }, 3000);
      } else {
        alert('Invalid username or password');
      }
    }
  };

  const infoCheck = ()=>{
    setShowWelcomeMessage(true);
  }
  return (
    <>
      <BasicExample />
      <HeaderNav />
      <div className="signUp">
        {showWelcomeMessage ? (
          <div>
            <h3>Welcome {formData.firstName} to N&M!</h3>
            <p>Thank you for choosing this channel.</p>
            <Link to="/pages/forum">
              <button type="submit">Join</button>
            </Link>
          </div>
        ) : (
          <>
            <h2>{isLoggingIn ? 'Login Page' : 'Sign Up Page'}</h2>
            <form onSubmit={handleSubmit}>
              {!isLoggingIn && (
                <>
                  <label>
                    Surname:
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                  </label>
                  <br />
                  <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                  </label>
                  <br />
                  {/* Add other sign-up form fields as needed */}
                </>
              )}
              <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
              </label>
              <br />
              <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
              </label>
              <br />
              {/* Add common form fields for both sign-up and login */}
              <div className="form-btn">
                <button onClick={infoCheck} type="submit">{isLoggingIn ? 'Login' : 'Sign Up'}</button>
              </div>
            </form>
            <div>
              <p>
                {isLoggingIn ? 'New to N&M? ' : 'Already have an account? '}
                <Link onClick={() => setIsLoggingIn(!isLoggingIn)}>
                  {isLoggingIn ? 'Sign Up' : 'Login'}
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
