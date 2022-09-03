import React from 'react';

import { useGlobalContext } from './context';
export default function News() {
  const { news, newsLoading } = useGlobalContext();
  const fallbackImgUrl = 'not-available.png';

  if (newsLoading) {
    return <h1>Loading</h1>;
  }
  //  console.log(news);

  return (
    <section className="section">
      <h1> Fresh News</h1>
      <div className="articles-center">
        {news.map((art, index) => {
          return (
            <div className="article" key={art._id}>
              <div className="img-container">
                <img
                  src={art.media}
                  alt={art.title}
                  onError="this.onerror=null; this.src='not-available.png';"
                />
              </div>
              <div className="article-footer">
                <h3>{art.title}</h3>
                <p>{art.excerpt}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
