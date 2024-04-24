// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Thread } from './thread';
// import './forum.css';
// import { IoMdArrowBack } from "react-icons/io";
// import { Link } from 'react-router-dom';

// export function Forum() {
//   const [posts, setPosts] = useState([]);
//   const [postContent, setPostContent] = useState('');
//   const [userAvatar, setUserAvatar] = useState('');
//   const [commentSectionVisible, setCommentSectionVisible] = useState(false);
//   const [selectedPostIndex, setSelectedPostIndex] = useState(null);
//   const [count, setCount] = useState(0);
//   const [comment, setComment] = useState(0);
//   const [isLike, setIsLike] = useState(false)
//   const [authenticatedUser, setAuthenticatedUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
//     setPosts(storedPosts);
  
//     const storedCommentCount = localStorage.getItem('commentCount');
//     setComment(storedCommentCount ? parseInt(storedCommentCount, 10) : 0);
  
//     const storedUsername = localStorage.getItem('authenticatedUser');
//     setAuthenticatedUser({ username: storedUsername });
  
//     if (storedUsername) {
//       const parsedUser = JSON.parse(storedUsername);
//       setAuthenticatedUser(parsedUser);
//     }
//   }, []);

//   const handleProfileUpdate = (updatedProfile) => {
//     console.log('Profile updated:', updatedProfile);
//     // Update the authenticatedUser state here
//   };

//   const handleProfileCancel = () => {
//     console.log('Profile update cancelled');
//   };
  

//   const handlePostSubmit = (event) => {
//     event.preventDefault();

//     if (postContent.trim() !== '') {
//       const newPost = {
//         content: postContent,
//         timestamp: new Date().toLocaleString(),
//         avatar: userAvatar,
//         comments: [],
//       };

//       setPosts((prevPosts) => [...prevPosts, newPost]);
//       setPostContent('');
//       setCommentSectionVisible(false);

//       localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
//     }
//   };

//   // function for updating users profile 
//    const onProfileUpdate = (updatedProfile) => {
//     // Implement the logic to update the user profile
//     console.log('Updating user profile:', updatedProfile);
//     // You can update the authenticatedUser state if needed
//     setAuthenticatedUser({ ...authenticatedUser, ...updatedProfile });
//   }

//   // In your Forum component file
// const handleCommentSubmit = (postId, commentContent, setCommentContent, handleIncreasecount, parentCommentIndex = null, parentUsername = null) => (event) => {
//   event.preventDefault();
// 
//   if (commentContent.trim() !== '') {
//     const updatedPosts = posts.map((post, index) => {
//       if (index === postId) {
//         return {
//           ...post,
//           comments: parentCommentIndex !== null ? (
//             // If parentCommentIndex is provided, it's a reply to a comment
//             post.comments.map((comment, commentIndex) => {
//               if (commentIndex === parentCommentIndex) {
//                 return {
//                   ...comment,
//                   replies: [
//                     ...comment.replies,
//                     { content: `@${parentUsername || authenticatedUser.username} ${commentContent}`, timestamp: new Date().toLocaleString(), avatar: userAvatar },
//                   ],
//                 };
//               }
//               return comment;
//             })
//           ) : (
//             // If parentCommentIndex is null, it's a new comment on the post
//             [
//               ...post.comments,
//               { content: commentContent, timestamp: new Date().toLocaleString(), avatar: userAvatar, replies: [] },
//             ]
//           ),
//         };
//       }
//       // handleIncreasecount()
//       return post;
//     });

//     setPosts(updatedPosts);
//     setCommentContent('');

//     localStorage.setItem('posts', JSON.stringify(updatedPosts));
//     handleIncreasecount()
//   }
// };


//   const toggleCommentSection = (index) => {
//     setCommentSectionVisible(!commentSectionVisible);
//     setSelectedPostIndex(index);
//   };

//   const handleIncreasecount = () => {
//     // setCount(count + 1);
//     setComment(comment + 1)
//   };

//   const handleChangeColor = () => {
//     if(!isLike){
//       // setColor("blue")
//       // console.log(color)
//       setCount(count + 1)
//       console.log(count)
//       setIsLike(true)
//     }
//     // setColor(color === 'white' ? 'blue' : 'white');
//   };

//   // const showProfileEdit = (user) => {
//   //   if (user && user.username) {
//   //     // Implement your logic to show the profile edit here
//   //     console.log('Showing profile edit for user:', user);
//   //   } else {
//   //     console.log('User not authenticated.');
//   //     // Optionally, you can redirect the user to the login or profile page
//   //     // navigate('/login'); // Uncomment this line if you want to use the 'navigate' function
//   //   }
//   // }

//   const handleProfileEditClick = () => {
//     // Check if authenticatedUser is set before initiating the profile update
//     if (authenticatedUser && authenticatedUser.username) {
//       // Call the function to initiate the user profile update
//       // initiateProfileUpdate(authenticatedUser);
//     } else {
//       console.log('User not authenticated.');
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid forum-page">
//       <Link to='/'>
//       <button className='btn-back my-2'><IoMdArrowBack style={{fontSize: '30px'}}/></button>
//       </Link>
//         <div className="row justify-content-center">
//           <h1>Discussion Page</h1>
//           <h6>N&M CHANNEL</h6>
//           <div className="col-lg-6 discuss-area">
//             <div className="post">
//               <form onSubmit={handlePostSubmit} className="form-field">
//                 <textarea
//                   value={postContent}
//                   onChange={(e) => setPostContent(e.target.value)}
//                   placeholder="Write your post..."
//                   style={{ margin: 'auto' }}
//                 ></textarea>
//                 {postContent.trim() && (
//                   <button type="submit" className="btn-post">
//                     Post
//                   </button>
//                 )}
//               </form>
//             </div>
//             <div id="posts">
//               {posts.map((post, index) => (
//                 <Thread
//                   key={index}
//                   post={post}
//                   index={index}
//                   commentSectionVisible={commentSectionVisible}
//                   selectedPostIndex={selectedPostIndex}
//                   toggleCommentSection={toggleCommentSection}
//                   handleCommentSubmit={handleCommentSubmit}
//                   handleIncreasecount={handleIncreasecount}
//                   count={count}
//                   comment={comment}
//                   handleChangeColor={handleChangeColor}
//                   authenticatedUser={authenticatedUser}
//                   // showProfileEdit={() => showProfileEdit(authenticatedUser)}
//                   onProfileEditClick={handleProfileEditClick}
//                   onProfileUpdate={handleProfileUpdate}
//                   onCancel={handleProfileCancel}
                  
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Thread } from './thread';
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { collection, addDoc, onSnapshot,query, where, runTransaction, doc, getDoc, getDocs,updateDoc, deleteDoc} from 'firebase/firestore';
import { firestore } from '../Component/firebase/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { fetchUserData, fetchUserDataById } from '../Component/firebase/firebase';
import { ProfileEdit } from './profile';

export function Forum() {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [commentSectionVisible, setCommentSectionVisible] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [count, setCount] = useState(0);
  const [comment, setComment] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [likeCounts, setLikeCounts] = useState({});
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null)
  const [showDeleteIcon, setShowDeleteIcon] = useState(false)
  const [color, setColor] =useState('black')
  const [commentLikes, setCommentLikes] = useState({});

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(); // Assuming this function returns the user object for the currently authenticated user
        setAuthenticatedUser(userData); // Set authenticatedUser to the user object
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
  
  
 const unsubscribe = onSnapshot(collection(firestore, 'posts'), async (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
      // Initialize comment counts for each post to 0
      const initialCommentCounts = postsData.reduce((acc, post) => {
        acc[post.id] = post.comments.length;
        return acc;
      }, {});
      setComment(initialCommentCounts);
    });

  
    fetchData();
    // fetchPosts()

    
  
    // Subscribe to authentication state changes
    const authUnsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // User is signed in
        const { displayName, photoURL } = user;
        setAuthenticatedUser({ username: displayName, avatar: photoURL });
        setUserAvatar(photoURL);
      } else {
        // User has signed out
        setAuthenticatedUser(null);
        setUserAvatar('');
        console.log('User signed out');
      }
    });
    authUnsubscribe()
  
    return () => {
      console.log('Unsubscribing from posts');
      unsubscribe();
    };
  }, []);
  

   // Handler to handle logout
   const handleLogout = async () => {
    try {
      await signOut(getAuth()); // Call signOut method from Firebase Authentication
      alert('Sign-out Successful')
      navigate('/pages'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
   
  // Handler to submit a post
  const handlePostSubmit = async (event) => {
    event.preventDefault();
  
    if (postContent.trim() !== '') {
      try {
        // Get the current authenticated user
        const user = getAuth().currentUser;
        if (user) {
          // Fetch the user data to get the correct username
          const userData = await fetchUserDataById(user.uid);
          if (userData) {
            // Use the default avatar icon if the user doesn't have an avatar yet
            const defaultAvatar = 'default_avatar_url'; 
            const avatar = userData.avatar || defaultAvatar; 
            const username = userData.username;
  
            // Include the username and avatar of the currently authenticated user when submitting a new post
            const newPostRef = await addDoc(collection(firestore, 'posts'), {
              content: postContent,
              timestamp: new Date().toLocaleString(),
              avatar: avatar,
              username: username, // Use the username fetched from the user's collection
              userId: user.uid, // Include the user ID
              comments: [],
            });
  
            const newPost = {
              id: newPostRef.id,
              content: postContent,
              timestamp: new Date().toLocaleString(),
              avatar: avatar,
              username: username, // Use the username fetched from the user's collection
              userId: user.uid, // Include the user ID
              comments: []
            };
  
            setPosts((prevPosts) => [...prevPosts, newPost]);
            setPostContent('');
            setCommentSectionVisible(false);
          } else {
            console.error('User data not found for authenticated user:', user.uid);
          }
        } else {
          console.log('User not signed in');
        }
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  };
  

  // Handler to submit a new comment
  const handleCommentSubmit = async (postId, commentContent, setCommentContent, handleIncreasecount) => {
    if (commentContent.trim() !== '') {
      try {
        
        const user = getAuth().currentUser;
        if (user) {
          // Fetch the user data to get the correct username
          const userData = await fetchUserDataById(user.uid);
          if (userData) {
            const newComment = {
              content: commentContent,
              user: {
                userId: user.uid,
                username: userData.username,
                avatar: userData.avatar,
              },
              timestamp: new Date().toLocaleString(),
              replies: [], // Initialize replies array if needed
            };
  
            const commentsRef = doc(firestore, 'posts', postId);
            await runTransaction(firestore, async (transaction) => {
              const postDoc = await transaction.get(commentsRef);
              if (!postDoc.exists()) {
                console.error('Post does not exist:', postId);
                return;
              }
  
              const postComments = postDoc.data().comments || [];
              postComments.push(newComment);
  
              transaction.update(commentsRef, { comments: postComments });
            });
  
            setCommentContent('');
            handleIncreasecount(postId);
          } else {
            console.error('User data not found for authenticated user:', user.uid);
          }
        } else {
          console.log('User not signed in');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };
  

//  handler for deleting post
const handleDeletePost = async (postId) => {
  console.log('Deleting post with id:', postId);
  try {
    setShowDeleteIcon(!showDeleteIcon)
    await deleteDoc(doc(firestore, 'posts', postId)); // Delete the post document from Firestore
    onDeletePost(postId); // Call the onDeletePost function passed from the Forum component
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};
const onDeletePost = (postId) => {
  // Implement the logic to handle post deletion here
  // For example, update the state to remove the deleted post from the posts array
  setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
};
  // Handler to toggle comment section visibility
  const toggleCommentSection = (index) => {
    setCommentSectionVisible(!commentSectionVisible);
    setSelectedPostIndex(index);
  };

  // const toggleCommentSection = (index) => {
  //   setCommentSectionVisible((prevState) => prevState === index ? null : index);
  //   setSelectedPostIndex(index);
  // };
  

  // Handler to increase the comment count
  const handleIncreasecount = (postId) => {
    setComment((prevCounts) => ({
      ...prevCounts,
      [postId]: (prevCounts[postId] || 0) + 1, // Increment the count for the specific post ID
    }));
  };

  // Handler to change color (example)
  const handlePostLike = (postId) => {
    if (!isLike) {
      // Increment the like count for the specific post
      setLikeCounts(prevCounts => ({
        ...prevCounts,
        [postId]: (prevCounts[postId] || 0) + 1
      }));
      setIsLike(true); // Set isLike to true when the like button is clicked
      console.log('Liked post with id:', postId);
    } else {
      console.log('You have already liked this post');
    }
  };

  const handleCommentLike = (postId, commentIndex) => {
    const commentId = `${postId}_${commentIndex}`; // Generate a unique identifier for each comment
    if (commentLikes[commentId]) {
      // If the comment is already liked, unlike it
      setCommentLikes(prevLikes => ({ ...prevLikes, [commentId]: false }));
    } else {
      // If the comment is not liked, like it
      setCommentLikes(prevLikes => ({ ...prevLikes, [commentId]: true }));
    }
  };
  
  
  
  

  // const handleChangeColor = (postId, currentCount, posts, setPosts) => {
  //   // Find the index of the post in the posts array
  //   const postIndex = posts.findIndex(post => post.id === postId);
  //   if (postIndex !== -1 && !posts[postIndex].isLike) {
  //     // Update the like count for the specific post
  //     const updatedPosts = [...posts];
  //     updatedPosts[postIndex].count = currentCount + 1; // Increment the current count
  //     updatedPosts[postIndex].isLike = true;
  //     setPosts(updatedPosts); // Update the state with the new count
  //   }
  // };
  

  // Handler for profile edit click
  const handleProfileEditClick = () => {
    if (authenticatedUser && authenticatedUser.username) {
      console.log('Initiate profile update for:', authenticatedUser);
      // Implement your logic for profile update here
    } else {
      console.log('User not authenticated.');
    }
  };

  const onProfileUpdate = async (updatedProfile) => {
    try {
      // Check if an avatar file is present
      if (updatedProfile.avatar) {
        // Upload the avatar to Firebase Storage
        const avatarUrl = await uploadAvatar(updatedProfile.avatar);
  
        // Update the user's profile data in Firestore with the new avatar URL
        await updateProfileInFirestore({
          ...updatedProfile,
          avatar: avatarUrl,
        });
  
        console.log('User profile updated successfully.');
      } else {
        // If no avatar file is present, update other profile data in Firestore
        await updateProfileInFirestore(updatedProfile);
        console.log('User profile updated successfully (without avatar).');
      }
  
      // Additional logic if needed
  
    } catch (error) {
      console.error('Failed to update user profile:', error);
      // Handle the error appropriately (e.g., show an error message)
    }
  };
  
  // Helper function to upload avatar to Firebase Storage
  const uploadAvatar = async (avatarFile) => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
  
      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const avatarUrl = await response.text();
        return avatarUrl;
      } else {
        throw new Error('Failed to upload avatar');
      }
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      throw error; // Propagate the error for the higher level to handle
    }
  };
  
  // Helper function to update user profile data in Firestore
  const updateProfileInFirestore = async (updatedProfile) => {
    // Use the appropriate Firestore API (e.g., updateDoc) to update the user's profile data
    // Example: Update the 'users' collection with the user's UID
    await updateDoc(doc(firestore, 'users', authenticatedUser.uid), updatedProfile);
  };
  

  return (
    <>
      <div className="container-fluid forum-page">
        <div className='double-btn'>
        <Link to='/'>
          <button className='btn-back my-2'><IoMdArrowBack style={{ fontSize: '30px' }} /></button>
        </Link>
        <button className='logout-btn'onClick={handleLogout}>log out</button>
        </div>
        <div className="row justify-content-center">
          <h1>Discussion Page</h1>
          <h6>N&M CHANNEL</h6>
          <div className="col-lg-6 discuss-area">
            <div className="post">
              <form onSubmit={handlePostSubmit} className="form-field">
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Write your post..."
                  style={{ margin: 'auto' }}
                ></textarea>
                {postContent.trim() && (
                  <button type="submit" className="btn-post">
                    Post
                  </button>
                )}
              </form>
            </div>
            <div id="posts">
            {/* {authenticatedUser && console.log('Authenticated User Data:', authenticatedUser)} */}

            {posts.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((post, index) => (
                  <Thread
                  key={index}
                  post={post}
                  index={index}
                  setPosts={setPosts}
                  commentSectionVisible={commentSectionVisible}
                  selectedPostIndex={selectedPostIndex}
                  toggleCommentSection={toggleCommentSection}
                  handleCommentSubmit={handleCommentSubmit}
                  handleIncreasecount={handleIncreasecount}
                  count={likeCounts[post.id] || 0}
                  comment={comment}
                  handlePostLike={handlePostLike}
                  authenticatedUser={authenticatedUser} // Pass the authenticated user data as a prop
                  // user={post.user} // Pass the user information associated with the post
                  handleDeletePost={() => handleDeletePost(post.id)} 
                  showDeleteIcon={showDeleteIcon}
                  onDeletePost={onDeletePost}
                  setShowDeleteIcon={setShowDeleteIcon}
                  color= {color}
                  handleCommentLike={handleCommentLike}
                  commentLikes={commentLikes}
                />
              ))}
             {userData && (
  <ProfileEdit
    authenticatedUser={{
      uid: userData.uid,
      email: userData.email,
      username: userData.username,
      profilePicture: '',
      // Add other properties as needed
    }}
   
  
  />
)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
