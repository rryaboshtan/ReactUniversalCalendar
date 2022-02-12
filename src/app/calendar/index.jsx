import React, { useState, useEffect } from 'react';
// import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import createHandler from 'react-cached-handler';

import buildCalendar from './build';
import dayStyles, { beforeToday } from './styles';
import Header from './header';

import './styles.css';

export default function Calendar({ value, setValue }) {
   const [calendar, setCalendar] = useState([]);
   // const [value, setValue] = useState(moment());

   const setDayValue = createHandler(day => !beforeToday(day) && setValue(day));

   useEffect(() => {
      setCalendar(buildCalendar(value));
   }, [value]);

   return (
      <div className='calendar'>
         <Header value={value} setValue={setValue}></Header>
         <div className='day-names'>
            {['m', 't', 'w', 't', 'f', 's', 's'].map(d => (
               <div className='week'>{d}</div>
            ))}
         </div>
         <div className='body'>
            {calendar.map(week => (
               <div key={uuidv4()}>
                  {week.map(day => (
                     <div className='day' data-id={day} onClick={setDayValue(day)} key={uuidv4()}>
                        {console.log('value = ', value)}
                        <label className={dayStyles(day, value)}>{day.format('D').toString()}</label>
                     </div>
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
}
