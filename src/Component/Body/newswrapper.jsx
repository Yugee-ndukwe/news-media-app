import React, { useState, useEffect } from "react";
import IMG from '../../assests/global.avif';
import { Carousel } from "react-bootstrap";
import VIDEO from '../../assests/Video.png'
import '../../index.css';

export function NewsSource() {
  const [travelArticles, setTravelArticles] = useState([]);
  const [crimeArticles, setCrimeArticles] = useState([]);
  const [educationArticles, setEducationArticles] = useState([]);
  

  useEffect(() => {
    const accessKey = 'pub_3637223b3450a0cc3c8fb2ec67bf1b22e6e2b';

    // Function to fetch news for a specific keyword with a delay
    const fetchNewsWithDelay = async (keyword, setter) => {
      const sourceUrl = `https://newsdata.io/api/1/news?apikey=${accessKey}&q=${keyword}`;

      try {
        const response = await fetch(sourceUrl);
        const data = await response.json();

        if (data.results) {
          // Ensure data.results is always an array
          const articlesData = Array.isArray(data.results) ? data.results : [data.results];

          // Filter out articles with bad images and set the state accordingly
          const filteredArticles = articlesData.filter(article => isValidArticle(article));
          setter(filteredArticles);
        } else {
          console.log('Error fetching data');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    // Function to check if an article is valid
    const isValidArticle = (article) => {
      // Check if article has valid image URL
      return article.image_url && typeof article.image_url === 'string' && article.image_url.trim() !== '';
    };

    // Fetch news for each keyword with a delay
    fetchNewsWithDelay('travel', setTravelArticles);
    fetchNewsWithDelay('crime', setCrimeArticles);
    fetchNewsWithDelay('education', setEducationArticles);
  }, []); // <-- The second parameter, the dependency array, is important to prevent infinite loops

  return (
    <div className="container-fluid" style={{ background: '#fcfcfc' }}>
      <div className="row justify-content-center">
        <div className="col-10 col-lg-4 align-items-center">
          <h2>Travel</h2>
          <Carousel interval={3000} className="carousel-content">
            {travelArticles.map((article, index) => (
              <Carousel.Item key={index}>
                <div className="w-100">
                  {article.video_url ?(
                     <iframe
                     src={article.video_url && article.video_is_valid}
                     title="News Video"
                     width="100%"
                     height="200px"
                     frameBorder="0"
                     allowFullScreen
                     className="card-img-top"
                   ></iframe>
                  ) : (
                    <img
                    className="d-block w-100"
                    src={article.image_url ? article.image_url : IMG} style={{ width: '100%', height: '300px' }} 
                    alt={article.title}
                  />
                  )}
                 
                </div>
                <Carousel.Caption>
                  <h3>{article.title}</h3>
                  <p>{article.description ? article.description.slice(0, 50) : 'There is no description for this article'}</p>
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
        <div className="col-10 col-lg-4 align-items-center">
          <h2>Crime</h2>
          <Carousel interval={3000} className="carousel-content">
            {crimeArticles.map((article, index) => (
              <Carousel.Item key={index}>
                <div className="w-100">
                {article.video_url ?(
                     <iframe
                     src={article.video_url && article.video_is_valid}
                     title="News Video"
                     width="100%"
                     height="200px"
                     frameBorder="0"
                     allowFullScreen
                     className="card-img-top"
                   ></iframe>
                  ) : (
                    <img
                    className="d-block w-100"
                    src={article.image_url ? article.image_url : IMG} style={{ width: '100%', height: '300px' }} 
                    alt={article.title}
                  />
                  )}
                </div>
                <Carousel.Caption>
                  <h3>{article.title}</h3>
                  <p>{article.description ? article.description.slice(0, 50) : 'There is no description for this article'}</p>
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
        <div className="col-10 col-lg-4 align-items-center">
          <h2>Education</h2>
          <Carousel interval={3000} className="carousel-content">
            {educationArticles.map((article, index) => (
              <Carousel.Item key={index}>
                <div className="w-100">
                {article.video_url ?(
                     <iframe
                     src={article.video_url && article.video_is_valid}
                     title="News Video"
                     width="100%"
                     height="200px"
                     frameBorder="0"
                     allowFullScreen
                     className="card-img-top"
                   ></iframe>
                  ) : (
                    <img
                    className="d-block w-100"
                    src={article.image_url ? article.image_url : IMG} style={{ width: '100%', height: '300px' }} 
                    alt={article.title}
                  />
                  )}
                </div>
                <Carousel.Caption>
                  <h3>{article.title}</h3>
                  <p>{article.description ? article.description.slice(0, 50) : 'There is no description for this article'}</p>
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
