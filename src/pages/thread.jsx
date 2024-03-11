// In your Thread component file

import React, { useState } from "react";
import './forum.css'
import { MdChat } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { LuSendHorizonal } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Thread = ({
  post,
  index,
  commentSectionVisible,
  selectedPostIndex,
  toggleCommentSection,
  handleCommentSubmit,
  handleIncreasecount,
  count,
  comment,
  handleChangeColor,
  authenticatedUser,
  onProfileEditClick
}) => {
  const { content, timestamp, avatar, comments } = post;
  const { username, profilePicture } = authenticatedUser || {};
  const [commentContent, setCommentContent] = useState('');
  console.log('Thread component received post:', post);
  console.log('Thread component received authenticatedUser:', authenticatedUser);
  console.log('Comment content:', commentContent);

  console.log(count);
  const navigate = useNavigate();

  // const handleProfileEditClick = () => {
  //   if (authenticatedUser && authenticatedUser.username) {
  //     onProfileUpdate(authenticatedUser);
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
             <Link to={'/pages/profile'}>
               <img src={profilePicture || 'default_profile_picture.jpg'} alt="." className="avatar" />
               </Link>
                <div>
                <p  className="user-name">{username}</p>
                  {/* <p className="user-name">{authenticatedUser.username}</p> */}
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
      className="chat-icon"
    />
    <span>{comment}</span>
    <AiOutlineLike
    onClick={() => handleChangeColor()}
      style={{fontSize: '22px'}}
      className="like-icon"
    />
    <span>{count}</span>
     </div>
      </div>
      
     

      {commentSectionVisible && selectedPostIndex === index && (
  <div className="comments">
    {post.comments.map((comment, commentIndex) => (
      <div key={commentIndex} className="comment">
        {/* Render each comment */}
        <div className="user-comment">
          <img src={comment.avatar || 'placeholder-avatar.png'} alt="." className="avatar" />
          <p className="user-name">{comment.user}</p>
        </div>
        <div className="comment-post">
          <p>{comment.content}</p>
          <small>{comment.timestamp}</small>
        </div>
        <div className="like-reply">
          <button className="like">Like</button>
          <button
            onClick={() => {
              // Add an authenticated username to the textarea when replying to a comment
              const replyUsername = comment.user || authenticatedUser.username;
              setCommentContent(`@${replyUsername} `);
            }}
            className="reply"
          >
            Reply
          </button>
        </div>
      </div>
    ))}
    <form
  onSubmit={(e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    handleCommentSubmit(post.id, commentContent, setCommentContent, handleIncreasecount);
  }}
  className="comment-form"
>
  <textarea
    value={commentContent}
    onChange={(e) => setCommentContent(e.target.value)}
    placeholder="Write your comment..."
  ></textarea>
  {commentContent.trim() && (
    <button className="comment-btn" type="submit">
      <LuSendHorizonal style={{ fontSize: '20px' }} />
    </button>
  )}
</form>

  </div>
)}

    </div>
    );

};
