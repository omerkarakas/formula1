import React from 'react';
import { useGlobalContext } from './context';
import Drivers from './Drivers';
import DriverStandings from './DriverStandings';
import News from './News';
import Seasons from './Seasons';
const Home = () => {
  const { news } = useGlobalContext();
  const fallbackImgUrl = 'not-available.png';
  return (
    <main>
      <h1>F1 Home Page</h1>
      {/* <News /> */}
      <Seasons />
      {/* <Drivers /> */}
      <DriverStandings />
    </main>
  );
};

export default Home;
