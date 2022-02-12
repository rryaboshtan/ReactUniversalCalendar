import React, { useState, useEffect } from 'react';
// import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import createHandler from 'react-cached-handler';

import buildCalendar from './build';
import dayStyles, { beforeToday, daysStyles, previewDaysStyles } from './getStyles';
import Header from './header';

import './styles.css';

export default function Calendar({ value, setValue }) {
   const [calendar, setCalendar] = useState([]);
   const [firstValue, setFirstValue] = useState(null);
   const [secondValue, setSecondValue] = useState(null);
   const [dates, setDates] = useState([]);
   const [previewDates, setPreviewDates] = useState([]);

   const setPreviewStyles = createHandler((day) => {
      let tempDay = day.clone();
      const tempArray = [];
      let findedIndex = null;

      if (firstValue) {
         if (day.isAfter(firstValue, 'day')) {
            tempDay = day.clone().add(1, 'day');
            while (tempDay.isAfter(firstValue.clone().add(1, 'day'), 'day')) {
               tempArray.push(tempDay);
               tempDay = tempDay.subtract(1, 'day').clone();
            }
            // tempArray.push(firstValue);
            setPreviewDates([...dates, ...tempArray]);
         } else if (day.isBefore(firstValue, 'day')) {
            tempDay.subtract(1, 'day');
            while (tempDay.isBefore(firstValue.clone().subtract(1, 'day'), 'day')) {
               console.error('isBefore');
               tempArray.push(tempDay);
               tempDay = tempDay.add(1, 'day').clone();
            }
            // tempArray.push(firstValue);
            setPreviewDates([...dates, ...tempArray]);
         }
      

      }
   })

   const setDayValue = createHandler((day, event) => {
      console.log('e.dataset = ', event.target.dataset.day);
      const tempArray = [];
      let tempDay = day.clone();
      let findedIndex = null;
      // tempDay.add(1, 'day');

      if (!beforeToday(day)) {
         // if (firstValue && secondValue && day.isBetween(firstValue, secondValue)) {

         findedIndex = dates.findIndex(date => date?.isSame(day));
         const previewFindedIndex = dates.findIndex(date => date?.isSame(day));
         if (findedIndex !== -1) {
            console.error('in Between-------');
            setDates(dates.filter((date, index) => index !== findedIndex));
            setPreviewDates(previewDates.filter((date, index) => index !== previewFindedIndex));
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
               tempDay = day.clone().add(1, 'day');
               while (tempDay.isAfter(firstValue.clone().add(1, 'day'), 'day')) {
                  tempArray.push(tempDay);
                  tempDay = tempDay.subtract(1, 'day').clone();
               }
               // tempArray.push(firstValue);
               setDates([...dates, ...tempArray]);
            } else if (day.isBefore(firstValue, 'day')) {
               tempDay.subtract(1, 'day');
               while (tempDay.isBefore(firstValue.clone().subtract(1, 'day'), 'day')) {
                  console.error('isBefore');
                  tempArray.push(tempDay);
                  tempDay = tempDay.add(1, 'day').clone();
               }
               // tempArray.push(firstValue);
               setDates([...dates, ...tempArray]);
            }

            setFirstValue(null);
            setSecondValue(null);
         }
      }
   });

   useEffect(() => {
      setCalendar(buildCalendar(value));
      // console.log('dates = ', dates);
   }, [value, firstValue, secondValue]);

   useEffect(() => {
      // setCalendar(buildCalendar(value));
      console.error('previewDates = ', previewDates);

      console.error('dates = ', dates);
      console.error(
         'dates = ',
         dates.map(date => date.format('DD/MM/YYYY'))
      );
   }, [dates, previewDates]);

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
                     <div className='day' onClick={setDayValue(day)} onMouseEnter={setPreviewStyles(day)} key={uuidv4()}>
                        {console.log('value = ', value)}
                        {console.log('firstValue = ', firstValue)}
                        {console.log('secondValue = ', secondValue)}
                        <div
                           className={
                              // dayStyles(day, firstValue) ||
                              // dayStyles(day, secondValue) ||
                              dayStyles(day, firstValue, secondValue) ||
                              dayStyles(day, secondValue, firstValue) ||
                              (dates && dates.length && daysStyles(day, dates)) ||
                              (previewDates && previewDaysStyles(day, previewDates))
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
