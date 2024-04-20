
// import React, { useEffect, useState } from 'react';
// import { BasicExample } from '../Navbar/navbar';
// import { useLocation } from 'react-router-dom';

// export function NewsDetail() {
//   const location = useLocation();
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     // Extract the URL parameter from the location object
//     const searchParams = new URLSearchParams(location.search);
//     const newsUrl = searchParams.get('url');

//     console.log('News URL:', newsUrl);

//     // Fetch the detailed news information based on the URL parameter
//     fetchNewsDetail(newsUrl);
//   }, [location.search]);

//   const fetchNewsDetail = (url) => {
//     console.log('Fetching detailed news:', url);

//      // Use CORS Anywhere to fetch the news without CORS issues
//   const corsAnywhereUrl = `http://localhost:3000/${url}`;

//     // Perform the necessary API call or logic to fetch detailed news information
//     // Replace this with your actual API call or logic
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//        if(data.results){
//         console.log('API Response:', data);
//         setNews(data.results); // Set the detailed news information in the state
//        }
//       })
//       .catch(error => {
//         console.error('Error fetching detailed news:', error);
//       });
//   };

//   if (!news) {
//     // Render a loading state or handle the case where detailed news information is not available yet
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//     <BasicExample/>
//   <h2>{news.title}</h2>
//   <p>{news.description}</p>
//   {/* Add other elements to display detailed news information */}
//   <img src={news.src} alt="News" style={{ width: '100%', height: 'auto' }} />
//   <p>URL: <a href={news.url} target="_blank" rel="noopener noreferrer">{news.url}</a></p>
//   {/* Add more elements based on your news object structure */}
// </div>
//   );
// }


import React from 'react';
import { useLocation } from 'react-router-dom';
import { BasicExample } from '../Navbar/navbar';
import { HeaderNav } from '../../header/headernav';
import { Footer } from '../footer/footer';
// import { useLocation } from 'react-router-dom';
// import './newsdetail.css';

export function NewsDetail (){
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get('videoUrl');

  return (
    <div className="news-detail-container">
    <BasicExample/>
    <HeaderNav/>

      <h2>Watch News</h2>
      {videoUrl ? (
        <div className="video-container">
          <iframe
            src={videoUrl}
            title="News Video"
            width="560"
            height="315"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>Vidoe is currently unavailable.</p>
      )}
      <Footer/>
    </div>
  );
};

// export default NewsDetail;
