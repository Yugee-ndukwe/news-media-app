// In your Thread component file

import React, { useState } from "react";
import './forum.css'
import { MdChat } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { LuSendHorizonal } from "react-icons/lu";

export function Thread ({ post, index, commentSectionVisible, selectedPostIndex, toggleCommentSection, handleCommentSubmit,count, handleIncreasecount, handleChangeColor, authenticatedUser, onProfileEditClick }) {
    const [commentContent, setCommentContent] = useState('');
    console.log('authenticatedUser in Thread:', authenticatedUser);
    

    const username = localStorage.getItem('username');

    // const handleProfileEditClick = () => {
    //   // Check if authenticatedUser is set before calling showProfileEdit
    //   if (authenticatedUser && authenticatedUser.username) {
    //     showProfileEdit(authenticatedUser);
    //   } else {
    //     console.log('User not authenticated.');
    //   }
    // };
    return (
      <div key={index}>
      <div className="post-wrapper">
      <div className="post-header"  onClick={onProfileEditClick} >
      {authenticatedUser && (
              <>
                <img src={authenticatedUser.avatar} alt='.' className="avatar" />
                <div>
                  <p className="user-name">{authenticatedUser.username}</p>
                </div>
              </>
            )}
      </div>
      <div className=" post-container">
      <p>{post.content}</p>
        <small>{post.timestamp}</small>
      </div>
      
     <div className="icon-holder">
     <MdChat 
     style={{fontSize: '20px'}}
      onClick={() => {
        toggleCommentSection(index);
        // handleIncreasecount(); // Call the function when the chat icon is clicked
      }}
     
    />
    
    <AiOutlineLike
    onClick={() => handleIncreasecount()}
      style={{fontSize: '22px'}}
    />
    <span>{count}</span>
     </div>
      </div>
      
     

      {commentSectionVisible && selectedPostIndex === index && (
        <div className="comments">
          {post.comments.map((comment, commentIndex) => (
            <div key={commentIndex} className="comment">
              <div className="user-comment">
              <img src={comment.avatar || 'placeholder-avatar.png'} alt="." className="avatar" />
              <p className="user-name">{authenticatedUser.username}</p>
              </div>
              <div  className="comment-post">
                <p>{comment.content}</p>
              <small>{comment.timestamp}</small>
                
              </div>
              <div className="like-reply">
              <button className="like">Like</button>
                <button onClick={() => {
        // Add an authenticated username to the textarea when replying a comment
        const replyUsername = comment.username || authenticatedUser.username; 
             setCommentContent(`@${replyUsername} `);
      }} className="reply">Reply</button>
              </div>
            </div>
          ))}
          <form onSubmit={handleCommentSubmit(index, commentContent, setCommentContent,handleIncreasecount)} className="comment-form">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write your comment..."
            ></textarea>
            {commentContent.trim() && (
            <button className="comment-btn" type="submit"><LuSendHorizonal style={{fontSize: '20px'}}/></button>
            )}
          </form>
        </div>
      )}
    </div>
    );
};
