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
              <Col key={index} sm={8}  lg={6}>
                <div className="news-container">
                  <div className="liked">
                    <div className="saved-news-item" style={{ display: 'flex', gap: '12px' }}>
                      <div>
                        <img src={savedNewsItem.src ? savedNewsItem.src : News} alt="src" style={{ width: '90px', height: '70px' }} />
                      </div>
                      <div style={{ width: '70%' }}>
                        <h6>{savedNewsItem.title ? savedNewsItem.title.slice(0,50) : 'No Title provided for this News'}</h6>
                        {savedNewsItem.url && (
                          <a href={savedNewsItem.url}>{savedNewsItem.url}</a>
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
