import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../../index.css'
import News from '../../assests/newsimg.jpg'
// import 'bootstrap/dist/css/bootstrap.min.css';

export function Savednews() {
  const [savedNews, setSavedNews] = useState([]);

  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem("savedNews")) || [];
    setSavedNews(storedNews);
  }, []);

  return (
    <>
    <hr />
      <Container fluid className="my-5 px-5">
        <h3>Most Liked</h3>
        {savedNews.length > 0 && (
          <Row className="mx-5">
            {savedNews.map((savedNewsItem, index) => (
              <Col key={index} sm={10}  lg={6}>
                <div className="news-container">
                  <div className="liked">
                    <div className="saved-news-item" >
                      <div className="saved-news-image">
                        <img src={savedNewsItem.src ? savedNewsItem.src : News} alt="src" style={{  }} />
                      </div>
                      <div className="saved-title">
                        <h6>{savedNewsItem.title ? savedNewsItem.title.slice(0,50) : 'No Title provided for this News'}</h6>
                        {savedNewsItem.url && (
                          <div className="saved-url-container">
                            <a href={savedNewsItem.url} target="_blank" rel="noopener noreferrer">
                              {window.innerWidth <= 500 ? savedNewsItem.url.slice(0, 30) + '...' : savedNewsItem.url}
                            </a>
                            </div>
                        )}
                        <p>{savedNewsItem.author}</p>
                        {/* <p>{savedNews.publishdAt}</p> */}
                      </div>
                      {/* Add any other information you want to display */}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
