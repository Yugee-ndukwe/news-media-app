import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Spinner from 'react-bootstrap/Spinner';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { VscChromeClose } from "react-icons/vsc";

import './profile.css';

export function ProfileEdit({ onProfileUpdate, onCancel }) {
  const auth = getAuth();
  const firestore = getFirestore();

  const [updatedProfile, setUpdatedProfile] = useState({
    username: auth.currentUser.displayName || '',
    avatar: auth.currentUser.photoURL || 'default_avatar_url',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [formModified, setFormModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false)
  const navigate = useNavigate

  const storage = getStorage();

  const handleUsernameChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, username: e.target.value });
    setFormModified(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    
      // Read the selected file to generate a preview
      const reader = new FileReader();
      reader.onload = function(event) {
        // Set the URL of the selected file as the avatar preview
        setUpdatedProfile({ ...updatedProfile, avatar: event.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      // If no file is selected, clear the avatar preview by setting it to null
      setUpdatedProfile({ ...updatedProfile, avatar: null });
    }
  };
  
  

  const handleAvatarUpload = async () => {
    try {
      if (avatarFile) {
        const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
        setIsLoading(true); // Show spinner
        await uploadBytes(storageRef, avatarFile);
  
        const avatarUrl = await getDownloadURL(storageRef);
  
        // Update user profile with the avatar URL using Firebase authentication service
        await updateProfile(auth.currentUser, { photoURL: avatarUrl });
  
        // Update Firestore document for the user
        const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { avatar: avatarUrl });
  
        setUpdatedProfile({ ...updatedProfile, avatar: null });

        setAvatarFile(null); // Clear uploaded file
        setIsLoading(false); // Hide spinner
        // alert('File sent'); // Alert message
        setMessage(true)
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      handleAvatarUploadError(error);
    }
  };
  
  const handleAvatarUploadError = (error) => {
    console.error('Failed to upload avatar:', error);
    alert('Failed to upload avatar. Please try again.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleAvatarUpload();

    // Additional logic for updating other profile details in Firestore if needed
    // ...

    setFormModified(false);
  };

  const handleCancel = () => {
    setUpdatedProfile({
      username: auth.currentUser.displayName || '',
      avatar: auth.currentUser.photoURL || 'default_avatar_url',
    });
    setFormModified(false);
    // navigate("pages/forum")
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (formModified) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [formModified]);

  return (
    <>
     
      <div className="container py-4">
        <div className="row">
          <div className="col-10 col-lg-6 m-auto">
          <div className="page-info py-4">
          <h4>My Profile</h4>
            <Link to={"/pages/forum"}><button type="button" className='cancel-btn' onClick={handleCancel}><VscChromeClose  style={{fontSize: '25px',background: 'none'}}/></button></Link>
          </div>
            <div className="profile-edit-form">

              <form onSubmit={handleSubmit} className='profile-form'>
                <label>
                  Username:
                  <input
                    type="text"
                    placeholder='username'
                    value={updatedProfile.username}
                    onChange={handleUsernameChange}
                  />
                </label>
                <br />
                <label className='profile-picture'>
              
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <br />
                  {updatedProfile.avatar && !isLoading && (
                    <img
                      src={updatedProfile.avatar}
                      alt="Preview"
                      style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
                    />
                  )}
                  {isLoading && (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                    
                    
                  )}
                  {message &&(
                    <Alert  variant="light">
                    File sent
                 </Alert>
                  )}
                  
                </label>
                <br />
                <div className='profile-btn'>
                  <button type="submit" className='save-btn'>Upload</button>
               
                   
                  
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
