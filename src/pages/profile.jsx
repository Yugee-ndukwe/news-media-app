import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc, getFirestore, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

  const storage = getStorage();

  const handleUsernameChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, username: e.target.value });
    setFormModified(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleAvatarUpload = async () => {
    try {
      if (avatarFile) {
        const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, avatarFile);
  
        const avatarUrl = await getDownloadURL(storageRef);
  
        // Update user profile with the avatar URL using Firebase authentication service
        await updateProfile(auth.currentUser, { photoURL: avatarUrl });
  
        // Update Firestore document for the user
        const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
        await updateDoc(userDocRef, { avatar: avatarUrl });
  
        setUpdatedProfile({ ...updatedProfile, avatar: avatarUrl });
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
      <div className="container">
        <div className="row">
          <div className="col-10 col-lg-4 m-auto">
            <h4>My Profile</h4>
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
                  Profile picture
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <br />
                  {updatedProfile.avatar && (
                    <img
                      src={updatedProfile.avatar}
                      alt="Preview"
                      style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
                    />
                  )}
                </label>
                <br />
                <div className='profile-btn'>
                  <button type="submit" className='save-btn'>Upload</button>
                  <button type="button" className='cancel-btn' onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
