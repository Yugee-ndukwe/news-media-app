import React, { useState, useEffect } from "react";
import { NewsItem } from ".././Component/Body/newsitem"
import { BasicExample } from ".././Component/Navbar/navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { HeaderNav } from "./headernav";

export function NgNews() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // const countryCode = 'ng'

  // const countryCode = location.pathname.split("/")[1];


  useEffect(() => {
    const apiKey = 'cc574f9456b9456787947bc79900f612';
     const countries = ['us', 'gb', 'ca', 'au', 'ng', 'ch', 'mx', 'ae', 'ru', 'it'];
    const url = `https://newsapi.org/v2/top-headlines?country=${countries}&apiKey=${apiKey}`;
    // console.log("Country Code:", countryCode);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.articles) {
          setArticles(data.articles);
        } else {
          console.error('Error: Data.articles is undefined or null');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClick = (url) => {
    // Use history.push to navigate to the detailed news page
    navigate(`/news/detail?url=${encodeURIComponent(url)}`);
  };

  return (
    <>
      <BasicExample />
      <HeaderNav/>
      {/* <h2 className="text-center">Breaking <span className="badge bg-success">News</span>{countryCode.toUpperCase()}</h2> */}
      {articles.map((news, index) => {
        return (
          
          <NewsItem
          
            key={index}
            title={news.title}
            description={news.description}
            content={news.content}
            src={news.urlToImage}
            url={news.url}
            onClick={() => handleClick(news.url)} // Pass the URL to handleClick
          />
        );
      })}
    </>
  );
}
