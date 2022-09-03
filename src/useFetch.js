import { useState, useEffect } from 'react';

const headers = {
  'X-RapidAPI-Key': '3cc9050913mshd7b54d4e45aa2b0p133b9djsn53727622b6f7',
  'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com',
};

//seasons : http://ergast.com/api/f1/seasons.json?limit=10
// SeasonsTable.Seasons[]

export const useFetch = () => {
  const url = `http://ergast.com/api/f1/seasons.json?limit=100&offset=50`;

  const [loadingData, setLoadingData] = useState(true);
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    //    console.log('data:', data);
    setData(data);
    setLoadingData(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return { loadingData, data };
};
