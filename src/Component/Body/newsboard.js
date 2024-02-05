// NewsBoard.js
import React, { useState, useEffect } from "react";
import { NewsItem } from "./newsitem";
import { BasicExample } from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";
import { HeaderNav } from "../../header/headernav";
import { Footer } from "../footer/footer";
import { Savednews } from "./savednews";
import { NewsSource } from "./newswrapper";
import { WorldNews } from "./world";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert'

export function NewsBoard({onCategoryChange}) {
   const [articles, setArticles] = useState([]);   //state for fetching news
  const [country, setCountry] = useState('us'); // Default country is 'us'
  const [category, setCategory] = useState('top'); //Default category
  const [loading, setLoading] = useState(true)  // state to show loading
  const [errorMessage, setErrorMeassage] = useState(false) //state to handle error
  const navigate = useNavigate();


  // newsdataapiKey = 'pub_363721f3ecefc23e654aa955822aa839e6bd3'
  const countryNames = {
    us: 'United States',
    gb: 'United Kingdom',
    ca: 'Canada',
    au: 'Australia',
    ng: 'Nigeria',
    // ch: 'China',
    // mx: 'Mexico',
    // ae: 'United Arab Emirates',
    // ru: 'Russia',
    // it: 'Italy',
  };

  // const categories = ['general', 'business', 'technology', 'health', 'science', 'sports', 'entertainment'];

  const categories = ['top', 'technology', 'health', 'science', 'sports'];

  // state for mounting the fetched news
  useEffect(() => {
    // const apiKey = 'cc574f9456b9456787947bc79900f612';
    // const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;

    const key = 'pub_3637223b3450a0cc3c8fb2ec67bf1b22e6e2b';
    const url = `https://newsdata.io/api/1/news?apikey=${key}&country=${country}&category=${category}`;
  
    // const apiUrl = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apiKey=${apiKey}`;

    // const apiUrl = `https://cors.bridged.cc/https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    // const apiUrl = `https://cors-anywhere.whoer.net/https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    const newsDataUrl = `https://newsdata.io/api/1/news?apikey=YOUR_API_KEY`


    const requestOptions = {
      method: 'GET',
      headers: {
        // 'X-Api-Key': apiKey
        'X-Requested-With': 'XMLHttpRequest',
        // 'Origin': 'https://news-media-app.vercel.app'
      }

    }

    fetch(url)
    // fetch(apiUrl,requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.results) {
          setArticles(data.results);
          console.log(data)
          setLoading(false)
          setErrorMeassage(false)
        } else {
          console.error('Error: Data.articles is undefined or null');
        }
      })
      .catch(error => {
        setLoading(true)
        setErrorMeassage(true)
        console.error('Error fetching data:', error);
      });
  }, [country, category]);

  const handleClick = (url) => {
    //  navigate to the detailed news page
    navigate(`/news/detail?url=${encodeURIComponent(url)}`);
  };

  // const handleCountryClick = (countryCode) => {
  //   setSelectedCountry(countryCode);
  // };

  // const handleCategoryChange = (countryCode,category)=>{
  //   setSelectedCountry(countryCode)
  //   setSelectedCategory(category)
  // }

  return (
    <>
       <BasicExample setCategory={setCategory}/>
      <HeaderNav setCountry={setCountry}/>
     {/* <WorldNews/> */}
     <NewsSource/>


      <div>
      <h5 style={{ textAlign: 'center', marginTop:'20px' }}>
          Today in {countryNames[country]} - {category} News
        </h5>
      </div>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="d-flex flex-wrap justify-content-around">
          {loading ? (
              <Spinner animation="border" />
            ) : (
              articles.map((news, index) => (
                <NewsItem
                key={index}
                title={news.title}
                description={news.description}
                content={news.content}
                src={news.image_url}
                url={news.link}
                onClick={() => handleClick(news.url)}
              />
              ))
            )}
             {errorMessage && (
              <Alert variant="danger">
                {errorMessage.message || 'Failed to connect'}
              </Alert> 
             )} 
          </div>
        </div>
      </div>
      <Savednews/>
      <Footer />
    </>
  );
}
