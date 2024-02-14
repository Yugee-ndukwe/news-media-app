
import React, { useEffect, useState } from 'react';
import { BasicExample } from '../Navbar/navbar';
import { useLocation } from 'react-router-dom';

export function NewsDetail() {
  const location = useLocation();
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Extract the URL parameter from the location object
    const searchParams = new URLSearchParams(location.search);
    const newsUrl = searchParams.get('url');

    console.log('News URL:', newsUrl);

    // Fetch the detailed news information based on the URL parameter
    fetchNewsDetail(newsUrl);
  }, [location.search]);

  const fetchNewsDetail = (url) => {
    console.log('Fetching detailed news:', url);

    // Perform the necessary API call or logic to fetch detailed news information
    // Replace this with your actual API call or logic
    fetch(url)
      .then(response => response.json())
      .then(data => {
       if(data.results){
        console.log('API Response:', data);
        setNews(data.results); // Set the detailed news information in the state
       }
      })
      .catch(error => {
        console.error('Error fetching detailed news:', error);
      });
  };

  if (!news) {
    // Render a loading state or handle the case where detailed news information is not available yet
    return <div>Loading...</div>;
  }

  return (
    <div>
    <BasicExample/>
  <h2>{news.title}</h2>
  <p>{news.description}</p>
  {/* Add other elements to display detailed news information */}
  <img src={news.src} alt="News" style={{ width: '100%', height: 'auto' }} />
  <p>URL: <a href={news.url} target="_blank" rel="noopener noreferrer">{news.url}</a></p>
  {/* Add more elements based on your news object structure */}
</div>
  );
}
