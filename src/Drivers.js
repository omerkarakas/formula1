import React from 'react';
import { useGlobalContext } from './context';

function Drivers() {
  const { drivers } = useGlobalContext();

  return (
    <div>
      <h3>Drivers</h3>
      {drivers.map((driver, index) => {
        return (
          <div className="driver" key={index}>
            <a href={driver.url} target="_blank" rel="noreferrer">
              {driver.givenName + ' ' + driver.familyName}
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default Drivers;
