// import React, { useState, useEffect } from 'react';
// import { BasicExample } from '../Component/Navbar/navbar';
// import { HeaderNav } from '../header/headernav';
// import { Link, useNavigate } from 'react-router-dom';
// import Spinner from 'react-bootstrap/Spinner';

// import './signup.css';

// export function SignUp() {
//   const [formData, setFormData] = useState({
//     surname: '',
//     firstName: '',
//     username: '',
//     // phoneNumber: '',
//     // gender: '',
//     // country: '',
//     // email: '',
//     password: '',
//   });

//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
//   const [isLoggingIn, setIsLoggingIn] = useState(false);
//   const [authenticatedUser, setAuthenticatedUser] = useState(null);
//   const [networkError, setNetworkError] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check network connection here and update the networkError state
//     // You can use the navigator.onLine property or any other method to check the network status
//     setNetworkError(!navigator.onLine);

//     // Load users from local storage
//     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//     setUsers(storedUsers);

   
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     // Check network connection before proceeding
//     if (networkError) {
//       alert('No network connection. Please connect to the internet.');
//       return;
//     }
    
//      // Set loading state to true
//      setIsLoading(true);

//     // Validate form data (you can add more validation logic)
//     if (
//       (!isLoggingIn &&
//         (!formData.firstName.trim() ||
//           !formData.surname.trim() ||
//           !formData.username.trim() ||
//           !formData.password.trim())) ||
//       (isLoggingIn && (!formData.username.trim() || !formData.password.trim()))
//     ) {
//       alert('Please fill in the required fields');
//       return;
//     }
  
//     // Check if the username is already taken after the state has been updated
//     const isUsernameTaken = users.some((user) => user.username === formData.username);
  
//     if (!isLoggingIn && isUsernameTaken) {
//       alert('Username is already taken. Please choose another one.');
//       return;
//     }else{
     
//     }
  
//     // Display form data
//     console.log('Form Data:', formData);
//     console.log('Show Welcome Message:', showWelcomeMessage);
//     console.log(isLoggingIn);
  
//     // Store user information in the users array
//     const updatedUsers = [...users, formData];
//     localStorage.setItem('users', JSON.stringify(updatedUsers));
//     // localStorage.setItem('username', formData.username);
//     setUsers(updatedUsers);
  
//     if (!isLoggingIn) {
//       setShowWelcomeMessage(true);
      
//       const newUser = { username: formData.username };
//     setAuthenticatedUser(newUser);
//       console.log('Setting authenticatedUser:', { username: formData.username });

//        // Store the username in local storage
//        localStorage.setItem('authenticatedUser', JSON.stringify({ username: formData.username }));
//        console.log(localStorage)
  
//       // Reset the form after successful sign-up
//       setFormData({
//         surname: '',
//         firstName: '',
//         username: '',
//         password: '',
//       });
  
//       // Navigate to the forum immediately after signup
//       navigate('/pages/forum');
//     } else {
//       // Login logic
//       const matchingUser = users.find((user) => user.username === formData.username);
  
//       if (matchingUser && matchingUser.password === formData.password) {
//         // alert('Login successful!');
//         setShowWelcomeMessage(true);
//         setAuthenticatedUser(matchingUser);
  
//         // Reset the form after successful login if needed
//         setFormData({
//           username: '',
//           password: '',
//         });
  
//         // Navigate to the forum after successful login
//         navigate('/pages/forum');
//       } else {
//         alert('Invalid username or password');
//          // Set loading state to false
//        setIsLoading(false);
//         return;
//       }
//     }
//   };
  
  
  

//   // const infoCheck = () => {
//   //   setShowWelcomeMessage(true);
//   // };

//   return (
//     <>
//       <BasicExample />
//       <HeaderNav />
//      <div className='container-fluid form-container'>
//         <div className='row'>
//           <div className='col-10 col-lg-4 m-auto'>
//           <div className="signUp">
//         {/* <Thread authenticatedUser={authenticatedUser}/> */}
//         {networkError && <p style={{ color: 'red' }}>No network connection. Please connect to the internet.</p>}
//         {showWelcomeMessage ? (
//           <div>
//             <h3>Welcome {formData.firstName} to N&M!</h3>
//             <p>Thank you for choosing this channel.</p>
//             <Link to="/pages/forum">
//               <button type="submit" className="join-btn">
//                 Join
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <>
//             <h2>{isLoggingIn ? 'Continue sharing your thought!!' : 'Become a member of our Channel'}</h2>
//             <form className='signup-form' onSubmit={handleSubmit}>
//               {!isLoggingIn && (
//                 <>
//                   <label>
//                     Surname:
//                     <input type="text" name="surname"placeholder='Surname' value={formData.surname} onChange={handleChange} required />
                   
//                   </label>
//                   <br />
//                   <label>
//                   First Name:
//                     <input type="text" name="firstName"placeholder='Firstname' value={formData.firstName} onChange={handleChange} required />
                    
//                   </label>
//                   <br />
//                 </>
//               )}
//               <label>
//                 Username:
//                 <input type="text" name="username" placeholder='Username' value={formData.username} onChange={handleChange} required />
               
//               </label>
//               <br />
//               <label>
//                 Password:
//                 <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
                
//               </label>
//               <br />
//               {/* <label className='profile-pix'>
//                 <div className='form-field'>
//                 Upload Picture:
//                 <input type="file" accept="image/*" onChange={handleChange}  />
//                 </div>
                
//               </label> */}
//               <br />
//               <div className="form-btn">
//                 <button  type="submit"className='form-butn'>
//                   {isLoading ? (
//                     <Spinner  animation="border"/>
//                   ):(
//                     isLoggingIn ? 'Login' : 'Sign Up'
//                   )

//                   }
//                   {/* {isLoggingIn ? 'Login' : 'Sign Up'} */}
//                 </button>
//               </div>
//             </form>
//             <div>
//               <p className='acc-switch'>
//                 {isLoggingIn ? 'New to N&M? ' : 'Already have an account? '}
//                 <Link onClick={() => setIsLoggingIn(!isLoggingIn)} >
//                   {isLoggingIn ? 'Sign Up' : 'Login'}
//                 </Link>
//               </p>
//             </div>
//           </>
//         )}
//       </div>
//           </div>
//         </div>
//      </div>
//     </>
//   );
// }


import React, { useState, useEffect } from 'react';
import { BasicExample } from '../Component/Navbar/navbar';
import { HeaderNav } from '../header/headernav';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc,getDoc, collection } from 'firebase/firestore';
import './signup.css';


const firebaseConfig = {
  apiKey: "AIzaSyCNfV0qe3WLDQ-fv97MhvSQKrlfW4ws9JY",
  authDomain: "news-media-ea4e2.firebaseapp.com",
  projectId: "news-media-ea4e2",
  storageBucket: "news-media-ea4e2.appspot.com",
  messagingSenderId: "301906506874",
  appId: "1:301906506874:web:73f376184175ba6906f7c3",
  measurementId: "G-WKQ74C5HPZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export function SignUp() {
  const [formData, setFormData] = useState({
    surname: '',
    firstName: '',
    username: '',
    email: '',
    password: '',
  });


  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const { signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check network connection here and update the networkError state
    setNetworkError(!navigator.onLine);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check network connection before proceeding
    if (networkError) {
      alert('No network connection. Please connect to the internet.');
      return;
    }

    // Set loading state to true
    setIsLoading(true);

    try {
      let user;

      if (isLoggingIn) {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        user = userCredential.user;

        // Fetch additional user data from Firestore
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          console.log('User Data:', userData);
          // You can use userData in your application as needed
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        user = userCredential.user;

        // Store additional user data in Firestore
        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, {
          surname: formData.surname,
          firstName: formData.firstName,
          username: formData.username,
          email: formData.email,
         
        });

        console.log('New user document created.');
      }

      // Reset the form after successful sign-up or login
      setFormData({
        surname: '',
        firstName: '',
        username: '',
        email: '',
        password: '',
      });

      // navigate to the forum after signup/login
      navigate('/pages/forum');
    } catch (error) {
      console.error('Authentication error:', error.message);
      alert(`Authentication error: ${error.message}`);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  

  return (
    <>
      <BasicExample />
      <HeaderNav />
      <div className='container-fluid form-container'>
        <div className='row'>
          <div className='col-10 col-lg-4 m-auto'>
            <div className="signUp">
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
                          <input type="text" name="surname" placeholder='Please Enter Your Surname' value={formData.surname} onChange={handleChange} required />
                        </label>
                        <br />
                        <label>
                          First Name:
                          <input type="text" name="firstName" placeholder='Please Enter Your Firstname' value={formData.firstName} onChange={handleChange} required />
                        </label>
                        <br />
                      </>
                    )}
                    <label>
                      Username:
                      <input type="text" name="username" placeholder='Please Enter Your Username' value={formData.username} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                      Email:
                      <input type="email" name="email" placeholder='Please Enter Your Email Address' value={formData.email} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                      Password:
                      <input type="password" name="password" placeholder='Please Enter Your Password' value={formData.password} onChange={handleChange} required />
                    </label>
                    <br />
                    <div className="form-btn">
                      <button type="submit" className='form-butn' disabled={isLoading}>
                        {isLoading ? <Spinner animation="border" /> : (isLoggingIn ? 'Login' : 'Sign Up')}
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
          </div>
        </div>
      </div>
    </>
  );
}