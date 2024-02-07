import React, { useState, useEffect } from 'react';
import { BasicExample } from '../Component/Navbar/navbar';
import { HeaderNav } from '../header/headernav';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import './signup.css';

export function SignUp() {
  const [formData, setFormData] = useState({
    surname: '',
    firstName: '',
    username: '',
    // phoneNumber: '',
    // gender: '',
    // country: '',
    // email: '',
    password: '',
  });

  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [networkError, setNetworkError] = useState(false);
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Check network connection here and update the networkError state
    // You can use the navigator.onLine property or any other method to check the network status
    setNetworkError(!navigator.onLine);

    // Load users from local storage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check network connection before proceeding
    if (networkError) {
      alert('No network connection. Please connect to the internet.');
      return;
    }
  
    // Validate form data (you can add more validation logic)
    if (
      (!isLoggingIn &&
        (!formData.firstName.trim() ||
          !formData.surname.trim() ||
          !formData.username.trim() ||
          !formData.password.trim())) ||
      (isLoggingIn && (!formData.username.trim() || !formData.password.trim()))
    ) {
      alert('Please fill in the required fields');
      return;
    }
  
    // Check if the username is already taken after the state has been updated
    const isUsernameTaken = users.some((user) => user.username === formData.username);
  
    if (!isLoggingIn && isUsernameTaken) {
      alert('Username is already taken. Please choose another one.');
      return;
    }
  
    // Display form data
    console.log('Form Data:', formData);
    console.log('Show Welcome Message:', showWelcomeMessage);
    console.log(isLoggingIn);
  
    // Store user information in the users array
    const updatedUsers = [...users, formData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    // localStorage.setItem('username', formData.username);
    setUsers(updatedUsers);
  
    if (!isLoggingIn) {
      setShowWelcomeMessage(true);
      const newUser = { username: formData.username };
    setAuthenticatedUser(newUser);
      console.log('Setting authenticatedUser:', { username: formData.username });

       // Store the username in local storage
       localStorage.setItem('authenticatedUser', JSON.stringify({ username: formData.username }));
       console.log(localStorage)
  
      // Reset the form after successful sign-up
      setFormData({
        surname: '',
        firstName: '',
        username: '',
        password: '',
      });
  
      // Navigate to the forum immediately after signup
      navigate('/pages/forum');
    } else {
      // Login logic
      const matchingUser = users.find((user) => user.username === formData.username);
  
      if (matchingUser && matchingUser.password === formData.password) {
        // alert('Login successful!');
        setShowWelcomeMessage(true);
        setAuthenticatedUser(matchingUser);
  
        // Reset the form after successful login if needed
        setFormData({
          username: '',
          password: '',
        });
  
        // Navigate to the forum after successful login
        navigate('/pages/forum');
      } else {
        alert('Invalid username or password');
        return;
      }
    }
  };
  
  
  

  // const infoCheck = () => {
  //   setShowWelcomeMessage(true);
  // };

  return (
    <>
      <BasicExample />
      <HeaderNav />
      <div className="signUp">
        {/* <Thread authenticatedUser={authenticatedUser}/> */}
        {networkError && <p style={{ color: 'red' }}>No network connection. Please connect to the internet.</p>}
        {showWelcomeMessage ? (
          <div>
            <h3>Welcome {formData.firstName} to N&M!</h3>
            <p>Thank you for choosing this channel.</p>
            <Link to="/pages/forum">
              <button type="submit" className="join-btn">
                Join
              </button>
            </Link>
          </div>
        ) : (
          <>
            <h2>{isLoggingIn ? 'Continue sharing your thought!!' : 'Become a member of our Channel'}</h2>
            <form className='signup-form' onSubmit={handleSubmit}>
              {!isLoggingIn && (
                <>
                  <label>
                    Surname:
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />
                  </label>
                  <br />
                  <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                  </label>
                  <br />
                </>
              )}
              <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
              </label>
              <br />
              <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
              </label>
              <br />
              <label className='profile-pix'>
                Upload Picture:
                <input type="file" accept="image/*" onChange={handleChange}  />
              </label>
              <br />
              <div className="form-btn">
                <button  type="submit"className='form-butn'>
                  {isLoggingIn ? 'Login' : 'Sign Up'}
                </button>
              </div>
            </form>
            <div>
              <p className='acc-switch'>
                {isLoggingIn ? 'New to N&M? ' : 'Already have an account? '}
                <Link onClick={() => setIsLoggingIn(!isLoggingIn)} >
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
