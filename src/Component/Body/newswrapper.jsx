// Carousel news
import React, { useState, useEffect } from "react";
import IMG from '../../assests/global.avif'
import { Carousel } from "react-bootstrap";
import '../../index.css'

export function NewsSource() {
  const [articles, setArticles] = useState([]);
  const keywords = ['travel', 'lifestyle', 'earth','bitcoin'];

  useEffect(() => {
    const accessKey = 'cc574f9456b9456787947bc79900f612';
    const pageSize = 5;

    // Fetch news for each keyword
    const fetchNews = async (keyword) => {
      const sourceUrl = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${accessKey}&pagesize=${pageSize}`;

      try {
        const response = await fetch(sourceUrl);
        const data = await response.json();

        if (data.articles) {
          // Concatenate the new articles with the existing ones
          setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        } else {
          console.log('Error fetching data');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    // Fetch news for each keyword
    keywords.forEach((keyword) => {
      fetchNews(keyword);
    });
  }, []); // <-- The second parameter, the dependency array, is important to prevent infinite loops

  return (
    <div className="container-fluid"style={{background: '#fcfcfc'}}>
      <div className="row justify-content-center">
        <div className="col-10 col-lg-10 align-items-center">
          {/* <h1>Articles</h1> */}
      <Carousel fade>
        {articles.map((article, index) => (
          <Carousel.Item key={index}>
             <div className="w-100">
                 <img
              className="d-block w-100"
              src={article.urlToImage ? article.urlToImage : IMG}
              alt={article.title}
            />
            </div>
            <Carousel.Caption>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <button className="btn-carousel"style={{border: '0',outline: '0', height: '50px', width: '100px', borderRadius: '10px'}}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  View More
                </a>
              </button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
        </div>
      </div>
    </div>
  );
}
