import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';

import Calendar from './calendar';

export default function App() {
   const [value, setValue] = useState(moment());
   let dates = [
      '15/02/2022',
      '19/02/2022',
      '18/02/2022',
      '17/02/2022',
      '16/02/2022',
      '22/02/2022',
      '26/02/2022',
      '25/02/2022',
      '24/02/2022',
      '23/02/2022',
      '08/03/2022',
      '19/03/2022',
      '18/03/2022',
      '17/03/2022',
      '16/03/2022',
      '15/03/2022',
      '14/03/2022',
      '12/03/2022',
      '11/03/2022',
      '10/03/2022',
      '09/03/2022',
      '31/03/2022',
      '01/04/2022',
      '21/04/2022',
      '20/04/2022',
      '13/04/2022',
      '15/04/2022',
      '14/04/2022',
   ];

   dates = dates.map(date => {
      const array = date.split('/');
      const day = Number(array[0]);
      const month = Number(array[1]);
      const year = Number(array[2]);
      const dateObj =  new Date(year, month, day);
      return moment(dateObj);
   });

   useEffect(() => {
      console.error('Other dates = ', dates);
   }, [dates]);

   return <Calendar value={value} setValue={setValue} defaultDates={dates}></Calendar>;
}
