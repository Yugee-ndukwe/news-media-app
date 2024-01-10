import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaComment } from "react-icons/fa";
import { Thread } from './thread';

export function Forum() {
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [commentSectionVisible, setCommentSectionVisible] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
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

  const handleCommentSubmit = (postId, commentContent, setCommentContent) => (event) => {
    event.preventDefault();

    if (commentContent.trim() !== '') {
      const updatedPosts = posts.map((post, index) => {
        if (index === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              { content: commentContent, timestamp: new Date().toLocaleString(), avatar: userAvatar },
            ],
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

  return (
    <>
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <h1>N&M CHANNEL</h1>
          <div className='col-lg-6 '>
          <div>
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
          />
        ))}
      </div>
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Write your post..."
        style={{margin: 'auto'}}></textarea>
        <FaComment/>
        <button type="submit">Submit</button>
      </form>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}