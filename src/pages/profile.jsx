import React, { useState, useEffect } from 'react';

export function ProfileEdit({ authenticatedUser, onProfileUpdate, onCancel }) {
  const [updatedProfile, setUpdatedProfile] = useState({
    username: authenticatedUser.username || '',
    avatar: authenticatedUser.avatar || 'default_avatar_url',
  });

  useEffect(() => {
    // Load user profile from local storage on component mount
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUpdatedProfile(JSON.parse(storedProfile));
    }
  }, []); // Empty dependency array ensures this effect runs only on mount

  const handleUsernameChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, username: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUpdatedProfile({ ...updatedProfile, avatar: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user profile to local storage
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

    // Update the profile through the onProfileUpdate callback
    onProfileUpdate(updatedProfile);
  };

  return (
    <div className="profile-edit-form">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={updatedProfile.username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          Avatar:
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          {updatedProfile.avatar && (
            <img
              src={updatedProfile.avatar}
              alt="Preview"
              style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
            />
          )}
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
