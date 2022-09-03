import React from 'react';
import { useGlobalContext } from './context';

export default function Seasons() {
  const {
    seasons,
    seasonsLoading: loading,
    currentSeason,
    setCurrentSeason,
  } = useGlobalContext();

  if (loading) {
    return <h1>Seasons Loading</h1>;
  }
  //console.log('seasons:', seasons);
  return (
    <div className="mb-3">
      <label htmlFor="seasons-select" className="form-label">
        Season
      </label>
      <select
        className="form-select form-select-lg mb-3"
        id="seasons-select"
        aria-label="Change season"
        onChange={(e) => setCurrentSeason(e.target.value)}
        defaultValue={currentSeason}
      >
        <option>Select a season</option>
        {seasons.map((season, index) => {
          return (
            <option value={season.season} key={index}>
              {season.season}
            </option>
          );
        })}
      </select>
    </div>
  );
}
