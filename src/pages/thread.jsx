import React from "react";
import { useState } from "react";


export function Thread ({ post, index, commentSectionVisible, selectedPostIndex, toggleCommentSection, handleCommentSubmit }) {
    const [commentContent, setCommentContent] = useState('');
    return (
        <div key={index}>
          <div className="post-header" onClick={() => toggleCommentSection(index)}>
            <img src={post.avatar || 'placeholder-avatar.png'} alt="User Avatar" className="avatar" />
            <p>{post.content}</p>
          </div>
          <small>{post.timestamp}</small>
          {commentSectionVisible && selectedPostIndex === index && (
            <div className="comments">
              {post.comments.map((comment, commentIndex) => (
                <div key={commentIndex} className="comment">
                  <img src={comment.avatar || 'placeholder-avatar.png'} alt="User Avatar" className="avatar" />
                  <p>{comment.content}</p>
                  <small>{comment.timestamp}</small>
                </div>
              ))}
              <form onSubmit={handleCommentSubmit(index, commentContent, setCommentContent)}>
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Write your comment..."
                ></textarea>
                <button type="submit">Comment</button>
              </form>
            </div>
          )}
        </div>
      );
    };
    