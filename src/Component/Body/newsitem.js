import React from 'react';
import {useState} from 'react'
import {  Modal,Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { Link} from 'react-router-dom';
import { IoMdCopy } from "react-icons/io";
import { FaShare} from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";
import { FaFacebook,  FaInstagram} from "react-icons/fa";
import { FaWhatsapp, FaComment  } from 'react-icons/fa';

import { FaXTwitter } from "react-icons/fa6";
import News from '../../assests/realistic-news-studio-background_23-2149985612.avif'
import IMG from '../../assests/fa-brands_facebook-square.svg'
import './newsitem.css'

export function NewsItem({ title, description, src, url, onClick }) {
  // console.log(description)
  // console.log("News Object:", { title, description, src, url, onClick })
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [commentSectionVisible, setCommentSectionVisible] = useState(false);
  const [comments, setComments] = useState([]);

  const shareUrl = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const increaseCount = () =>{
    if(!isLiked){
      const storedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
      const newNews = { title, description, src, url };
      localStorage.setItem('savedNews', JSON.stringify([...storedNews, newNews]));

      setCount(count+ 1)
    console.log(count)
    setIsLiked(true);
    }
  }

  const copyUrl = () =>{
    const copiedText = `${title}\n${url}`;
    const urlElement = document.createElement('textarea');
    urlElement.value = copiedText;
    document.body.appendChild(urlElement);
    urlElement.select();
    document.execCommand('copy');
    document.body.removeChild(urlElement);
    alert('URL copied to clipboard!');
  }
  const handleClick = () => {
    if (onClick) {
      onClick(url)
    }
  }
  const message = `{"url": "${url}"}}`;

  const checkClick= () => {
    alert(message);

  }
                
  const toggleCommentSection = () => {
    setCommentSectionVisible(!commentSectionVisible);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (commentContent.trim() !== '') {
      const newComment = {
        id: Date.now(), // Unique identifier for the comment
        content: commentContent,
        timestamp: new Date(),
      };

      setComments((prevComments) => [...prevComments, newComment]);
      setCommentContent('');
    }
  };


// Helper function to format time difference
const formatTime = (timestamp) => {
  const now = new Date();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const hours = Math.floor(minutes / 60);
  return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
};


  
  return (
    <>
      <div className="card  mb-3  " style={{ maxWidth: '400px' }}>
        <img src={src ? src : News} style={{ width: '100%', height: '200px' }} className="card-img-top" alt="..." />
        <div className="card-body" style={{height:'300px',}}>
          <h5 className="card-title">{title ? title.slice(0,50) : 'No title was provided for this item '}</h5>
          <p className="card-text">{description ? description.slice(0,100) : 'This webpage was generated by the domain owner using Sedo Domain Parking. Disclaimer: Sedo maintains no relationship with third party advertisers.'}</p>
          {/* {videoUrl && (
        <div>
          <iframe width="560" height="315" src={videoUrl} frameborder="0" allowfullscreen title="Video"></iframe>
        </div>
      )} */}
          <div className="contain">
            <a href={url}target='blank' className="btn btn-primary">
              Read More
            </a>
            {/* <button>
            <Link to={`/news/detail?url=${encodeURIComponent(url)}`}>Read More</Link>
            </button> */}
           
            <button onClick={shareUrl} className="btn1 btn-light">
              <FaShare className='btnShare'/>
              {/* <FaWhatsapp/> */}
            </button>
            {/* <button onClick={toggleCommentSection} className="btn1">
              <FaComment className='btnComment'/>
              <span>{comments.length}</span>
            </button> */}
            <button onClick={increaseCount} className="btn1">
              <AiTwotoneLike className='btnLike'/>
              <span>{count}</span>
            </button>
          </div>
            
          {commentSectionVisible && (
          <div className="comment-section">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write your comment..."
            ></textarea>
            <button onClick={handleCommentSubmit} className="comment-submit-btn">
               Comment
            </button>
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p>{comment.content}</p>
                <small>{formatTime(comment.timestamp)}</small>
              </div>
            ))}
          </div>
        )}
          
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><Button className='btn-copy' onClick={copyUrl}><IoMdCopy /></Button></Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-btn'>
        <p>{url}</p>
          <div style={{display:'flex', justifyContent:'center', gap:'20px'}}>
          <Button className='btn-whatsapp' variant="light" onClick={() => window.open(`whatsapp://send?text=${url}}`, '_blank')}>
            <FaWhatsapp className='btnWhat'/>
          </Button>
          <Button className='btn-fb' variant="primary" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`${title}: ${description}`)}`, '_blank')}>
            <FaFacebook className='btnFb'/> 
            {/* {IMG} */}
          </Button>
          <Button className='btn-ig' variant="primary" onClick={() => window.open(`https://www.instagram.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`${title}: ${description}`)}`, '_blank')}>
            <FaInstagram className='btnIg'/> 
            {/* {IMG} */}
          </Button>
          <Button className='btn-tweet' variant="primary" onClick={() => window.open(`https://www.twitter.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(`${title}: ${description}`)}`, '_blank')}>
            <FaXTwitter className='btnTweet'/> 
            {/* {IMG} */}
          </Button>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
