import React, { useState } from "react";
import './forum.css'
import { MdChat, MdDelete } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { LuSendHorizonal } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Thread = ({
  post,
  index,
  setPosts={setPosts},
  commentSectionVisible,
  selectedPostIndex,
  toggleCommentSection,
  handleCommentSubmit,
  handleIncreasecount,
  count,
  comment,
  handlePostLike,
  authenticatedUser,
  user,
  handleDeletePost,
  onProfileEditClick,
  showDeleteIcon,
  onDeletePost,
  setShowDeleteIcon,
  color,
  handleCommentLike,
  commentLikes
}) => {
  const { content, timestamp, username, avatar, comments } = post;
  const [commentContent, setCommentContent] = useState('');
  const navigate = useNavigate();

  return (
    <div key={index}>
      <div className="post-wrapper">
        <div className="post-header" onClick={onProfileEditClick}>
          {authenticatedUser && (
            <>
              <div className="user-info">
                <Link to={'/pages/profile'}>
                  <img src={avatar || 'default_profile_picture.jpg'} alt="." className="avatar" />
                </Link>
                <div>
                  <p className="user-name">{username}</p>
                </div>
              </div>
            </>
          )}
          <div>
            <BsThreeDotsVertical onClick={() => setShowDeleteIcon(index === showDeleteIcon ? null : index)} />
          </div>
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
            }}
            className="chat-icon"
          />
          <span>{comment[post.id]}</span>
          <AiOutlineLike
            onClick={() => handlePostLike(post.id)}
            style={{fontSize: '22px'}}
            className="like-icon"
          />
          <span>{count}</span>
        </div>
        <div className="delete-icon">
          {authenticatedUser && showDeleteIcon === index && (
            <div className="delete-btn-container">
              <MdDelete onClick={() => handleDeletePost(post.id)} style={{fontSize: '22px'}} className="delete-btn" />
              <span className="toolbin">Delete</span>
            </div>
          )}
        </div>
      </div>
      {commentSectionVisible && selectedPostIndex === index && (
        <div className="comments">
          {post.comments.map((comment, commentIndex) => (
            <div key={commentIndex} className="comment">
              <div className="user-comment">
                <img src={comment.user.avatar || 'placeholder-avatar.png'} alt="." className="avatar" />
                <p className="user-name">{comment.user.username}</p>
              </div>
              <div className="comment-post">
                <p>{comment.content}</p>
                <small>{comment.timestamp}</small>
              </div>
              <div className="like-reply">
                <button
                  onClick={() => handleCommentLike(post.id, commentIndex)}
                  className="like"
                  style={{ color: commentLikes[`${post.id}_${commentIndex}`] ? 'blue' : 'black' }}
                >
                  <AiOutlineLike style={{ gap: '7px' }} />
                  Like
                </button>
                <button
                  onClick={() => {
                    const replyUsername = comment.user ? comment.user.username : '';
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
              e.preventDefault();
              handleCommentSubmit(post.id, commentContent, setCommentContent, handleIncreasecount(post.id), username);
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
