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
      const tempArray = [];
      let tempDay = day.clone();
      let findedIndex = null;
      tempDay.add(1, 'day');

      if (!beforeToday(day)) {
         // if (firstValue && secondValue && day.isBetween(firstValue, secondValue)) {
            
            findedIndex = dates.findIndex(date => date?.isSame(day));
         if (findedIndex !== -1) {
               console.error('in Between-------');
               setDates(dates.filter((date, index) => index !== findedIndex));
               return;
            }
         // }

         if (firstValue && secondValue && !day.isBetween(firstValue, secondValue) && !day.isBetween(secondValue, firstValue)) {
            setDates([...dates, day]);
            return;
         }
         if (!firstValue) {
            setFirstValue(day);
            setDates([...dates, day]);
            setDates([...dates, day]);
         } else if (!secondValue) {
            setSecondValue(day);
            if (day.isAfter(firstValue, 'day')) {
               while (tempDay.isAfter(firstValue.clone().add(1, 'day'), 'day')) {
                  tempArray.push(tempDay);
                  tempDay = tempDay.subtract(1, 'day').clone();
               }
               // tempArray.push(firstValue);
               setDates([...dates, ...tempArray]);
            }

            setFirstValue(null);
            setSecondValue(null);
            // if (day.isBefore(firstValue, 'day')) {
            //    while (tempDay.isBefore(firstValue.clone().add(1, 'day'), 'day')) {
            //       tempArray.push(tempDay);
            //       tempDay = tempDay.subtract(1, 'day').clone();
            //    }
            //    // tempArray.push(firstValue);
            //    setDates([...dates, ...tempArray]);
            // }
         }
      }
   });

   useEffect(() => {
      setCalendar(buildCalendar(value));
      // console.log('dates = ', dates);
   }, [value, firstValue, secondValue]);

   useEffect(() => {
      // setCalendar(buildCalendar(value));
      console.log('dates = ', dates);
   }, [dates]);

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
                              (dates && dates.length && daysStyles(day, dates))
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
