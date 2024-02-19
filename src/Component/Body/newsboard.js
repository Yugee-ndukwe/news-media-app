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

export function NewsBoard() {
   const [articles, setArticles] = useState([]);   //state for fetching news
  const [country, setCountry] = useState('us'); // Default country is 'us'
  const [category, setCategory] = useState('top'); //Default category
  const [loading, setLoading] = useState(true)  // state to show loading
  const [errorMessage, setErrorMeassage] = useState(false) //state to handle error
  // const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();


  // newsdataapiKey = 'pub_363721f3ecefc23e654aa955822aa839e6bd3'
  const countryNames = {
    us: 'United States',
    gb: 'United Kingdom',
    ca: 'Canada',
    au: 'Australia',
    ng: 'Nigeria',
    ch: 'China',
    mx: 'Mexico',
    ae: 'Iraq',
    ru: 'Russia',
    it: 'Italy',
  };

  // const categories = ['general', 'business', 'technology', 'health', 'science', 'sports', 'entertainment'];

  const categories = ['top','business', 'technology', 'health', 'science', 'sports','entertainment'];

  // state for mounting the fetched news
  useEffect(() => {
    // const apiKey = 'cc574f9456b9456787947bc79900f612';
    // const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;

    const key = 'pub_3637223b3450a0cc3c8fb2ec67bf1b22e6e2b';
    const url = `https://newsdata.io/api/1/news?apikey=${key}&country=${country}&category=${category}`;

    
    setLoading(true); // Set loading to true when making a new request

    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results) {
          setArticles(data.results);
          console.log(data)
          setLoading(false)
          setErrorMeassage(false)
        } else {
          console.error('Error: Data.articles is undefined or null');
        setLoading(true)

        }
      })
      .catch(error => {
        setLoading(false)
        setErrorMeassage(true)
        console.error('Error fetching data:', error);
      });

       // Cleanup function
    // return () => {
    //   // Reset articles when the component unmounts
    //   setArticles([]);
    // };
  }, [country, category]);

  const handleClick = (url) => {
    // if(oncliclk){
    //   // onClick(url);
    
    // }
       //  navigate to the detailed news page
       navigate(`/news/detail?url=${encodeURIComponent(url)}`);
  };

  // const loadNextPage = () => {
  //   setCurrentPage((prevPage) => prevPage + 1);
  // };

  // const loadPreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage((prevPage) => prevPage - 1);
  //   }
  // };

  
  // const loadNextPage = () => {
  //   setCurrentPage(currentPage + 1);
  //   setTimeout(() => {
  //     // fetch next page news here
  //   }, 1000); // wait for 1 second before fetching next page news
  // };
  return (
    <>
       <BasicExample setCategory={setCategory}/>
      <HeaderNav setCountry={setCountry}/>
     {/* <WorldNews/> */}
     <NewsSource/>


      <div>
      <h5 style={{ textAlign: 'center', marginTop:'20px' }}>
      <span className="badge bg-danger fs-4">Latest</span>
      News  {countryNames[country]} - {category} 
          
          {/* <span className="badge">{countryNames[country]} - {category}</span> */}

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
                // videoUrl={news.video_url} 
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
      <Footer  setCountry={setCountry}  setCategory={setCategory}/>
    </>
  );
}
