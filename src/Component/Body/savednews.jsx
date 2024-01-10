import React, { useState, useEffect } from "react";

export function Savednews() {
  const [savedNews, setSavedNews] = useState([]);

  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem("savedNews")) || [];
    setSavedNews(storedNews);
  }, []);

  return (
    <>
    <hr />
        <h3>Most Liked</h3>
      <div className=" container-fluid d-flex">
        {savedNews.length > 0 && (
          <div className="row">
                    <div className="col-lg-6">
                    {savedNews.map((savedNewsItem, index) => (
              <div key={index} className="saved-news-item" style={{ width: '100%', display: 'flex'}}>
                <div>
                    <img src={savedNewsItem.src} alt="src" style={{width: '90px', height: '70px'}}/>
                </div>
                <div style={{width: '100%'}}>
                <h6>{savedNewsItem.title}</h6>
                {savedNewsItem.url && (
            <a href={savedNewsItem.url}>{savedNewsItem.url}</a>
                )}

                {/* <p>{savedNewsItem.description}</p> */}
                </div>
                {/* Add any other information you want to display */}
              </div>
            ))}
                    </div>
          </div>
        )}
      </div>
    </>
  );
}
