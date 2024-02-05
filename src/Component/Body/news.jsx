// // import { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { HeaderNav } from '../../header/headernav';
// // import { BasicExample } from '../Navbar/navbar';
// // import { NewsItem } from './newsitem';
// // import { Savednews } from './savednews';
// // import { Footer } from '../footer/footer';
// // import Spinner from 'react-bootstrap/Spinner';
// // import Alert from 'react-bootstrap/Alert'

// // export function News() {
// //   const [articles, setArticles] = useState([]);
// //   const [country, setCountry] = useState('us');
// //   const [category, setCategory] = useState('general');
// //   const [loading, setLoading] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState(false);
// //   const navigate = useNavigate();

// //   const countryNames = {
// //     us: 'United States',
// //     gb: 'United Kingdom',
// //     ca: 'Canada',
// //     au: 'Australia',
// //     ng: 'Nigeria',
// //     ch: 'China',
// //     mx: 'Mexico',
// //     ae: 'United Arab Emirates',
// //     ru: 'Russia',
// //     it: 'Italy',
// //   };


// //   useEffect(() => {
// //     const apiKey = 'cc574f9456b9456787947bc79900f612';
// //     const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;

// //     setLoading(true);
// //     setErrorMessage(false);

// //     fetch(url)
// //       .then(response => response.json())
// //       .then(data => {
// //         if (data.articles) {
// //           setArticles(data.articles);
// //           setLoading(false);
// //           console.log(data)
// //         } else {
// //           console.error('Error: Data.articles is undefined or null');
// //         }
// //       })
// //       .catch(error => {
// //         setLoading(false);
// //         setErrorMessage(true);
// //         console.error('Error fetching data:', error);
// //       });

// //       console.log('country')
// //   }, [country, category]);

// //   return (
// //     <>
// //     <BasicExample setCategory={setCategory}/>
    
// //     <HeaderNav setCountry={setCountry}/>

// //     <div className='my-5'>
// //       <h5 style={{ textAlign: 'center' }}>
// //           Today in {countryNames[country]} - {category} News
// //         </h5>
// //       </div>
// //       <div className="container-fluid my-3">
// //         <div className="row">
// //           <div className="d-flex flex-wrap justify-content-around">
// //           {loading ? (
// //               <Spinner animation="border" />
// //             ) : (
// //               articles.map((news, index) => (
// //                 <NewsItem
// //                   key={index}
// //                   title={news.title}
// //                   description={news.description}
// //                   content={news.content}
// //                   src={news.urlToImage}
// //                   url={news.url}
// //                   onClick={() => handleClick(news.url)}
// //                 />
// //               ))
// //             )}
// //              {errorMessage && (
// //               <Alert variant="danger">
// //                 {errorMessage.message || 'Failed to connect'}
// //               </Alert> 
// //              )} 
// //           </div>
// //         </div>
// //       </div>
// //       {/* <NewsSource/> */}
// //       {/* <WorldNews/> */}
// //       <Savednews/>
// //       <Footer />
// //     </>
// //   );
// // }

// import React, { useState, useEffect } from "react";

// export function News() {
//   const [articles, setArticles] = useState([]);
//   const [country,setCountry] = useState('us')

//   const countries = {
//     us: 'united state',
//     gb: 'united kingdom',
//     ca: 'canada',
//     ng: 'nigeria',
//     au: 'australia'
//   }

//   useEffect(() => {
//     const key = 'pub_3637223b3450a0cc3c8fb2ec67bf1b22e6e2b';
//     const url = `https://newsdata.io/api/1/news?apikey=${key}&country=${country}`;
  
//     fetch(url)
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result)
//         setArticles(result.results)
//         if (result.articles && result.articles.length > 0) {
//           setArticles(result.articles);
//         } else {
//             console.warn('Warning: Data.articles is undefined, null, or empty');
//         }
//       })
//       .catch((err) => {
//         console.error('Error fetching data:', err);
//       });
//       // const getArticles =  async () => {
//       //   const response = await fetch(url)
//       //   const data = await response.json()
//       //   setArticles(data.articles)
//       // console.log(data)

//       // }
//       // getArticles()

//       // const getArticles = async () => {
//       //   try {
//       //     const response = await fetch(url);
//       //     const data = await response.json();
//       //     console.log(data); // Log the data to the console
//       //     setArticles(data.results);
//       //   } catch (error) {
//       //     console.error('Error fetching data:', error);
//       //   }
//       // };
//       // getArticles()
      
//   }, []);
  
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-lg 4">
//           {articles.map((news,index) => (
//             <div key={index}>
//               <h3>{news.title}</h3>
//               <p>{news.description}</p>
//               <p>{news.content}</p>
//               <div>{news.link}</div>
//             </div>
//           ))}
//           {/* {articles && articles.length > 0 ? (
//           articles.map((news, index) => (
//             <div key={index}>
//               <h3>{news.title}</h3>
//               <p>{news.description}</p>
//               <p>{news.content}</p>
//               <div>{news.link}</div>
//             </div>
//           ))
//         ) : (
//           <p>Loading...</p>
//         )} */}
//            {/* {articles && articles.length === 0 ? (
//           <p>Loading...</p>
//         ) : (
//           articles.map((news, index) => (
//             <div key={index}>
//               <h3>{news.title}</h3>
//               <p>{news.description}</p>
//               <p>{news.content}</p>
//               <div>{news.link}</div>
//             </div>
//           ))
//         )} */}
//           {/* {articles.forEach((news,index)=>{
//             return(
//               <div key={index}>
//                 <h3>{news.title}</h3>
//                 <p>{news.description}</p>
//               </div>
//             )
//           })} */}
//         </div>
//       </div>
//     </div>
//   );
// }
