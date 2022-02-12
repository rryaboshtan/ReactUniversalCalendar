import React, { useState, useEffect } from 'react';
// import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import createHandler from 'react-cached-handler';

import buildCalendar from './build';
import dayStyles, { beforeToday, daysStyles } from './styles';
import Header from './header';

import './styles.css';

export default function Calendar({ value, setValue }) {
   const [calendar, setCalendar] = useState([]);
   const [firstValue, setFirstValue] = useState(null);
   const [secondValue, setSecondValue] = useState(null);
   const [dates, setDates] = useState([]);

   const setDayValue = createHandler((day, event) => {
      console.log('e.dataset = ', event.target.dataset.day);

      if (firstValue && secondValue && !day.isBetween(firstValue, secondValue) && !day.isBetween(secondValue, firstValue)) {
         setDates([...dates, day])
      }
      if (!firstValue) {
         return !beforeToday(day) && setFirstValue(day);
      } else if (!secondValue) {
         return !beforeToday(day) && setSecondValue(day);

      }
   });

   useEffect(() => {
      setCalendar(buildCalendar(value));
   }, [value, firstValue, secondValue]);

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
                     <div className='day' data-day='2' onClick={setDayValue(day)} key={uuidv4()}>
                        {console.log('value = ', value)}
                        {console.log('firstValue = ', firstValue)}
                        {console.log('secondValue = ', secondValue)}
                        <div
                           className={
                              dayStyles(day, firstValue) ||
                              dayStyles(day, secondValue) ||
                              dayStyles(day, firstValue, secondValue) ||
                              dayStyles(day, secondValue, firstValue) ||
                              daysStyles(day, dates)
                           }
                        >
                           {day.format('D').toString()}
                        </div>
                     </div>
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
}
