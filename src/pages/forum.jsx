import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Thread } from './thread';
import './forum.css';
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';

export function Forum() {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [commentSectionVisible, setCommentSectionVisible] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [count, setCount] = useState(0);
  const [comment, setComment] = useState(0);
  const [isLike, setIsLike] = useState(false)
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  
    const storedCommentCount = localStorage.getItem('commentCount');
    setComment(storedCommentCount ? parseInt(storedCommentCount, 10) : 0);
  
    const storedUsername = localStorage.getItem('authenticatedUser');
    setAuthenticatedUser({ username: storedUsername });
  
    if (storedUsername) {
      const parsedUser = JSON.parse(storedUsername);
      setAuthenticatedUser(parsedUser);
    }
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
const handleCommentSubmit = (postId, commentContent, setCommentContent, handleIncreasecount, parentCommentIndex = null, parentUsername = null) => (event) => {
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
      // handleIncreasecount()
      return post;
    });

    setPosts(updatedPosts);
    setCommentContent('');

    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    handleIncreasecount()
  }
};


  const toggleCommentSection = (index) => {
    setCommentSectionVisible(!commentSectionVisible);
    setSelectedPostIndex(index);
  };

  const handleIncreasecount = () => {
    // setCount(count + 1);
    setComment(comment + 1)
  };

  const handleChangeColor = () => {
    if(!isLike){
      // setColor("blue")
      // console.log(color)
      setCount(count + 1)
      console.log(count)
      setIsLike(true)
    }
    // setColor(color === 'white' ? 'blue' : 'white');
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
      <Link to='/'>
      <button className='btn-back my-2'><IoMdArrowBack style={{fontSize: '30px'}}/></button>
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
