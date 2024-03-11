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
// import { useAuth } from './auth';
// import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import {useDocument} from 'react-firebase-hooks/firestore'
import { collection, addDoc, onSnapshot,query, where, runTransaction, doc, getDoc, getDocs } from 'firebase/firestore';
// import firebaseConfig from './firebase';
import { firestore } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchUserData } from './firebase';

export function Forum() {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [commentSectionVisible, setCommentSectionVisible] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [count, setCount] = useState(0);
  const [comment, setComment] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUserData();
        const firstUser = usersData[0];
        console.log('Fetched user data:', firstUser);
        setAuthenticatedUser(firstUser);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
  
    const unsubscribe = onSnapshot(collection(firestore, 'posts'), async (snapshot) => {
      const postsData = await Promise.all(snapshot.docs.map(async (doc) => {
        const postData = { id: doc.id, ...doc.data() };
        // Ensure comments is initialized as an array
        postData.comments = postData.comments || [];
        return postData;
      }));
      setPosts(postsData);
    }, (error) => {
      console.error('Error fetching posts:', error);
    });
  
    fetchData();
  
    return () => {
      console.log('Unsubscribing from posts');
      unsubscribe();
    };
  }, []);
   

  // Handler to submit a new post
  const handlePostSubmit = async (event) => {
    event.preventDefault();

    if (postContent.trim() !== '') {
      try {
        const newPostRef = await addDoc(collection(firestore, 'posts'), {
          content: postContent,
          timestamp: new Date().toLocaleString(),
          avatar: userAvatar,
          comments: [],
        });

        const newPost = { id: newPostRef.id, content: postContent, timestamp: new Date().toLocaleString(), avatar: userAvatar, comments: [] };

        setPosts((prevPosts) => [...prevPosts, newPost]);
        setPostContent('');
        setCommentSectionVisible(false);
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  };

  // Handler to submit a new comment
  const handleCommentSubmit = async (postId, commentContent, setCommentContent, handleIncreasecount) => {
    if (commentContent.trim() !== '') {
      try {
        const commentsRef = doc(firestore, 'posts', postId);
        await runTransaction(firestore, async (transaction) => {
          const postDoc = await transaction.get(commentsRef);
          if (!postDoc.exists()) {
            console.error('Post does not exist:', postId);
            return;
          }
  
          const postComments = postDoc.data().comments || [];
          const newComment = {
            content: commentContent,
            user: authenticatedUser.username,
            timestamp: new Date().toLocaleString(),
            avatar: userAvatar,
            replies: [],
          };
          postComments.push(newComment);
  
          transaction.update(commentsRef, { comments: postComments });
        });
  
        setCommentContent('');
        handleIncreasecount(postId); // Pass the postId to the handleIncreasecount function
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
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
  const handleIncreasecount = () => {
    setComment(comment + 1);
  };
  

  // Handler to change color (example)
  const handleChangeColor = () => {
    if (!isLike) {
      setCount(count + 1);
      setIsLike(true);
    }
  };

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
        <Link to='/'>
          <button className='btn-back my-2'><IoMdArrowBack style={{ fontSize: '30px' }} /></button>
        </Link>
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

              {posts.map((post, index) => (
                  <Thread
                  key={index}
                  post={post}
                  index={index}
                  commentSectionVisible={commentSectionVisible}
                  selectedPostIndex={selectedPostIndex}
                  toggleCommentSection={toggleCommentSection}
                  handleCommentSubmit={handleCommentSubmit}
                  handleIncreasecount={handleIncreasecount}
                  count={count}
                  comment={comment}
                  handleChangeColor={handleChangeColor}
                  authenticatedUser={authenticatedUser} // Pass the authenticated user data as a prop
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
   
    onCancel={onCancel}
  />
)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
