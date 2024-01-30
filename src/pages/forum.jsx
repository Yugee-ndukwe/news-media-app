import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Thread } from './thread';
import './forum.css';

export function Forum() {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [commentSectionVisible, setCommentSectionVisible] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('white');
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);

    const storedUsername = localStorage.getItem('authenticatedUser');
      setAuthenticatedUser({ username: storedUsername });

      if (storedUsername) {
        const parsedUser = JSON.parse(storedUsername);
        setAuthenticatedUser(parsedUser);
      }

    
    // Ensure storedUsername is not null or undefined before setting authenticatedUser
    // if (storedUsername) {
    //   setAuthenticatedUser({ username: storedUsername });
    // } else {
    //   console.log('Username not found in localStorage.');
    // }
  }, []);

  const handlePostSubmit = (event) => {
    event.preventDefault();

    if (postContent.trim() !== '') {
      const newPost = {
        content: postContent,
        timestamp: new Date().toLocaleString(),
        avatar: userAvatar,
        comments: [],
      };

      setPosts((prevPosts) => [...prevPosts, newPost]);
      setPostContent('');
      setCommentSectionVisible(false);

      localStorage.setItem('posts', JSON.stringify([...posts, newPost]));
    }
  };

  // In your Forum component file
const handleCommentSubmit = (postId, commentContent, setCommentContent, parentCommentIndex = null, parentUsername = null) => (event) => {
  event.preventDefault();

  if (commentContent.trim() !== '') {
    const updatedPosts = posts.map((post, index) => {
      if (index === postId) {
        return {
          ...post,
          comments: parentCommentIndex !== null ? (
            // If parentCommentIndex is provided, it's a reply to a comment
            post.comments.map((comment, commentIndex) => {
              if (commentIndex === parentCommentIndex) {
                return {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    { content: `@${parentUsername || authenticatedUser.username} ${commentContent}`, timestamp: new Date().toLocaleString(), avatar: userAvatar },
                  ],
                };
              }
              return comment;
            })
          ) : (
            // If parentCommentIndex is null, it's a new comment on the post
            [
              ...post.comments,
              { content: commentContent, timestamp: new Date().toLocaleString(), avatar: userAvatar, replies: [] },
            ]
          ),
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setCommentContent('');

    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  }
};


  const toggleCommentSection = (index) => {
    setCommentSectionVisible(!commentSectionVisible);
    setSelectedPostIndex(index);
  };

  const handleIncreasecount = () => {
    setCount(count + 1);
  };

  const handleChangeColor = () => {
    setColor(color === 'white' ? 'blue' : 'white');
  };

  // const showProfileEdit = (user) => {
  //   if (user && user.username) {
  //     // Implement your logic to show the profile edit here
  //     console.log('Showing profile edit for user:', user);
  //   } else {
  //     console.log('User not authenticated.');
  //     // Optionally, you can redirect the user to the login or profile page
  //     // navigate('/login'); // Uncomment this line if you want to use the 'navigate' function
  //   }
  // }

  const handleProfileEditClick = () => {
    // Check if authenticatedUser is set before initiating the profile update
    if (authenticatedUser && authenticatedUser.username) {
      // Call the function to initiate the user profile update
      // initiateProfileUpdate(authenticatedUser);
    } else {
      console.log('User not authenticated.');
    }
  };

  return (
    <>
      <div className="container-fluid forum-page">
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
                  handleChangeColor={handleChangeColor}
                  authenticatedUser={authenticatedUser}
                  // showProfileEdit={() => showProfileEdit(authenticatedUser)}
                  onProfileEditClick={handleProfileEditClick}
                  
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
