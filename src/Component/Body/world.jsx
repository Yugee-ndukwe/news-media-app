import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

export function WorldNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const accessKey = 'cc574f9456b9456787947bc79900f612';
    const pageSize = 15;
    const sourceUrl = `https://newsapi.org/v2/everything?q=world&apiKey=${accessKey}&pageSize=${pageSize}`;

    const requestOptions = {
      method: 'GET',
      headers: {
        'X-Api-Key': accessKey
      }
    };

    fetch(sourceUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.articles) {
          setArticles(data.articles);
        } else {
          console.log('Error fetching data');
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }, []);

  return (
    <div className="container-fluid">
      {/* <nav>
        <ul>
          <li><Link>Travel</Link></li>
          <li>World</li>
          <li>Sports</li>
        </ul>
      </nav> */}
      <h1>WORLD</h1>
      <Carousel fade>
        {articles.map((article, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={article.urlToImage}
              alt={article.title}
            />
            <Carousel.Caption>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <button>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
