// NewsBoard.js
import React, { useState, useEffect } from "react";
import { NewsItem } from "./newsitem";
import { BasicExample } from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";
import { HeaderNav } from "../../header/headernav";
import { Footer } from "../footer/footer";
import { Savednews } from "./savednews";

export function NewsBoard() {
  const [articles, setArticles] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('us'); // Default country is 'us'
  const navigate = useNavigate();

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
    // const url = `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=${apiKey}`;
    // const apiUrl = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=${apiKey}`;

    // const apiUrl = `https://cors.bridged.cc/https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    const apiUrl = `https://cors-anywhere.whoer.net/https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;


    const requestOptions = {
      method: 'GET',
      headers: {
        // 'X-Api-Key': apiKey
        'X-Requested-With': 'XMLHttpRequest',
        // 'Origin': 'https://news-media-app.vercel.app'
      }

    }

    fetch(apiUrl, requestOptions)
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
  };

  const handleCountryClick = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  return (
    <>
      <BasicExample />
      <HeaderNav setSelectedCountry={setSelectedCountry} />
      <div>
      <h5 style={{textAlign: 'center'}}>
        Today in {countryNames[selectedCountry]}
      </h5>
      </div>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="d-flex flex-wrap justify-content-around">
            {articles.map((news, index) => (
              <NewsItem
                key={index}
                title={news.title}
                description={news.description}
                content={news.content}
                src={news.urlToImage}
                url={news.url}
                onClick={() => handleClick(news.url)}
              />
            ))}
          </div>
        </div>
      </div>
      <Savednews/>
      <Footer />
    </>
  );
}
