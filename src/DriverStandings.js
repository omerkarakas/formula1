import React from 'react';
import { useGlobalContext } from './context';
import { Grid } from 'gridjs-react';

const columns = ['Position', 'Name'];

function DriverStandings() {
  const { driverStandings } = useGlobalContext();
  const data = [];

  driverStandings.forEach((driver, index) => {
    data.push({
      position: driver.position,
      name: driver.Driver.givenName + ' ' + driver.Driver.familyName,
      key: index,
    });
  });
  console.log(data);
  return (
    <Grid
      data={data}
      columns={columns}
      search={true}
      pagination={{
        enabled: true,
        limit: 1,
      }}
    />
  );
  // return (
  //   <div>
  //     <h3>Drivers Standings</h3>
  //     <div className="driver-list">
  //       {driverStandings.map((driver, index) => {
  //         return (
  //           <div className="driver-list-item" key={index}>
  //             <p>
  //               {driver.position} , {driver.points}, {driver.wins},{' '}
  //               {driver.Driver.givenName + ' ' + driver.Driver.familyName}
  //               {driver.Constructors[0].name}
  //             </p>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );
}

export default DriverStandings;
