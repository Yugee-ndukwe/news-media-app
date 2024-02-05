import React, { useState, useEffect } from "react";
import IMG from '../../assests/global.avif';
import { Carousel } from "react-bootstrap";
import '../../index.css';

export function NewsSource() {
  const [articles, setArticles] = useState([]);
  const keywords = ['travel','crime'];

  useEffect(() => {
    const accessKey = 'pub_3637223b3450a0cc3c8fb2ec67bf1b22e6e2b';
    const pageSize = 5;

    // Fetch news for each keyword
    const fetchNews = async (keyword) => {
      const sourceUrl = `https://newsdata.io/api/1/news?apikey=${accessKey}&q=${keyword}`;
    
      try {
        const response = await fetch(sourceUrl);
        const data = await response.json();
    
        if (data.results) {
          // Ensure data.results is an array before concatenating
          const newArticles = Array.isArray(data.results) ? data.results : [data.results];
    
          // Concatenate the new articles with the existing ones
          setArticles((prevArticles) => [...prevArticles, ...newArticles]);
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
    <div className="container-fluid" style={{ background: '#fcfcfc' }}>
      <div className="row justify-content-center">
        <div className="col-10 col-lg-8 align-items-center">
          <Carousel fade className="carousel-content">
            {articles.map((article, index) => (
              <Carousel.Item key={index}>
                <div className="w-100">
                  <img
                    className="d-block w-100"
                    src={article.image_url ? article.image_url : IMG}
                    alt={article.title}
                  />
                </div>
                <Carousel.Caption>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <button className="btn-carousel" style={{ border: '0', outline: '0', height: '50px', width: '100px', borderRadius: '10px' }}>
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
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
