// // TechnologyNews.js
import React, { useState, useEffect } from "react";
import { NewsItem } from "./newsitem";
import { BasicExample } from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";
import { HeaderNav } from "../../header/headernav";
import {Footer} from '../footer/footer'

export function ScienceCategory() {
  const [articles, setArticles] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('us')
  const navigate = useNavigate()

  const countryNames = {
    us: 'United States',
    gb: 'United Kingdom',
    ca: 'Canada',
    au: 'Australia',
    ng: 'Nigeria',
    ch: 'China',
    mx: 'Mexico',
    ae: 'United Arab Emirates',
    ru: 'Russia',
    it: 'Italy',
  };

  useEffect(() => {
    const apiKey = 'cc574f9456b9456787947bc79900f612';
    const url = `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&category=science&apiKey=${apiKey}`;

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
  }, [selectedCountry]);

  const handleClick = (url) => {
    // Use history.push to navigate to the detailed news page
    navigate(`/news/detail?url=${encodeURIComponent(url)}`);
  }

  const handleCountryClick = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  return (
    <>
        <BasicExample/>
      {/* <h2 className="text-center">Science News</h2> */}
      <HeaderNav/>
      <div className="container-fluid my-3">
          <div className="row">
            <div className="d-flex flex-wrap justify-content-around">
      {/* <h2 className="text-center">Breaking <span className="badge bg-success">News</span></h2> */}
      {articles.map((news, index) => {
        return (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            content={news.content}
            src={news.urlToImage}
            url={news.url}
            onClick={() => handleClick(news.url)}   // Pass the URL to handleClick
          />
        );
      })}
            </div>
          </div>
      </div>
      <Footer/>
    </>
  );
}
