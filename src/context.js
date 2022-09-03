import React, { useState, useContext, useEffect } from 'react';
import { compareTwoStrings } from 'string-similarity';

// make sure to use https

//const sevenDaysFromNow = moment(new Date() - 7).format('YYYY/MM/DD');
const NEWS_API_ENDPOINT = `https://api.newscatcherapi.com/v2/search?q=formula1&lang=en`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);

  const [currentSeason, setCurrentSeason] = useState(2022);
  const [seasons, setSeasons] = useState([]);
  const [seasonsLoading, setSeasonsLoading] = useState(false);

  const [drivers, setDrivers] = useState([]);
  const [currentDriver, setCurrentDriver] = useState(null);

  const [driverStandings, setDriverStandings] = useState([]);

  const fetchSeasons = async () => {
    try {
      const url = `http://ergast.com/api/f1/seasons.json?limit=100&offset=50`;
      setSeasonsLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        const ssns = data.MRData.SeasonTable.Seasons;
        ssns.reverse();
        setSeasons(ssns);
        setCurrentSeason(ssns[0].season);
      }
    } catch (error) {
      console.log(error);
    }
    setSeasonsLoading(false);
  };

  const fetchDrivers = async () => {
    try {
      const url = `http://ergast.com/api/f1/${currentSeason}/drivers.json`;
      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        setDrivers(data.MRData.DriverTable.Drivers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDriverStandings = async () => {
    const data = await fetchData(
      `http://ergast.com/api/f1/current/driverStandings.json`
    );
    if (data) {
      console.log(data);
      setDriverStandings(data.StandingsTable.StandingsLists[0].DriverStandings);
    }
  };

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        return data.MRData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNews = async () => {
    function checkSimilar(text1, text2) {
      return compareTwoStrings(text1, text2) < 0.3;
    }
    const newsOptions = {
      headers: {
        'x-api-key': process.env.REACT_APP_NEWS_API_KEY,
      },
    };

    try {
      setNewsLoading(true);

      const response = await fetch(NEWS_API_ENDPOINT, newsOptions);
      const data = await response.json();
      //      console.log('fn,data', data);
      const copyArticles = [...data.articles];

      const uniqueNews = [];
      copyArticles.forEach((article) => {
        if (uniqueNews.every((art) => checkSimilar(art.title, article.title))) {
          uniqueNews.push(article);
        }
      });

      setNews(uniqueNews);
    } catch (error) {
      console.log(error);
    }
    setNewsLoading(false);
  };

  useEffect(() => {
    // fetchNews();
    //setSeason(seasons.at[seasons.length - 1]);
    fetchSeasons();
    fetchDriverStandings();
  }, []);

  useEffect(() => {
    fetchDrivers();
  }, [currentSeason]);

  return (
    <AppContext.Provider
      value={{
        news,
        newsLoading,
        seasons,
        seasonsLoading,
        currentSeason,
        setCurrentSeason,
        drivers,
        currentDriver,
        setCurrentDriver,
        driverStandings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
