import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import createHandler from 'react-cached-handler';

import buildCalendar from './build';
import dayStyles, { beforeToday, daysStyles, previewDaysStyles } from './getStyles';
import Header from './header';

import './styles.css';

export default function Calendar() {
   let defaultDates = [
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

   defaultDates = defaultDates.map(date => {
      const array = date.split('/');
      const day = Number(array[0]);
      const month = Number(array[1]);
      const year = Number(array[2]);
      const dateObj = new Date(year, month, day);
      return moment(dateObj);
   });

   const [calendar, setCalendar] = useState([]);
   const [firstValue, setFirstValue] = useState(null);
   const [secondValue, setSecondValue] = useState(null);
   const [dates, setDates] = useState(defaultDates || []);
   const [previewDates, setPreviewDates] = useState([]);
   const [value, setValue] = useState(moment());

   // useEffect(() => {
   //    console.error('Other dates = ', dates);
   // }, [dates]);

   const setPreviewStyles = createHandler(day => {
      let tempDay = day.clone();
      const tempArray = [];
      // let findedIndex = null;

      if (firstValue) {
         setDatesArray(day, tempDay, tempArray, setPreviewDates, false);
         // if (day.isAfter(firstValue, 'day')) {
         //    tempDay = day.clone().add(1, 'day');
         //    while (tempDay.isAfter(firstValue.clone().add(1, 'day'), 'day')) {
         //       tempArray.push(tempDay);
         //       tempDay = tempDay.subtract(1, 'day').clone();
         //    }
         //    // tempArray.push(firstValue);
         //    setPreviewDates([...dates, ...tempArray]);
         // } else if (day.isBefore(firstValue, 'day')) {
         //    tempDay.subtract(1, 'day');
         //    while (tempDay.isBefore(firstValue.clone().subtract(1, 'day'), 'day')) {
         //       console.error('isBefore');
         //       tempArray.push(tempDay);
         //       tempDay = tempDay.add(1, 'day').clone();
         //    }
         //    // tempArray.push(firstValue);
         //    setPreviewDates([...dates, ...tempArray]);
         // }
      }
   });

   function setDatesArray(day, tempDay, tempArray, setDatesCallback, selectedDates) {
      if (day.isAfter(firstValue, 'day')) {
         tempDay = day.clone().add(1, 'day');
         while (tempDay.isAfter(firstValue.clone().add(1, 'day'), 'day')) {
            tempArray.push(tempDay);
            tempDay = tempDay.subtract(1, 'day').clone();
         }
         // tempArray.push(firstValue);
         setDatesCallback([...dates, ...tempArray]);
      } else if (day.isBefore(firstValue, 'day')) {
         tempDay.subtract(1, 'day');
         while (tempDay.isBefore(firstValue.clone().subtract(1, 'day'), 'day')) {
            console.error('isBefore');
            tempArray.push(tempDay);
            tempDay = tempDay.add(1, 'day').clone();
         }
         // tempArray.push(firstValue);
         if (selectedDates) {
            setDatesCallback([...dates, ...tempArray]);
         } else {
            setDatesCallback([...tempArray]);
         }
      }
   }

   const setDayValue = createHandler((day, event) => {
      console.log('e.dataset = ', event.target.dataset.day);
      const tempArray = [];
      let tempDay = day.clone();
      // let findedIndex = null;
      // tempDay.add(1, 'day');

      if (!beforeToday(day)) {
         // if (firstValue && secondValue && day.isBetween(firstValue, secondValue)) {

         const findedIndex = dates.findIndex(date => date?.isSame(day));
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
            setPreviewDates([]);
            setSecondValue(day);

            setDatesArray(day, tempDay, tempArray, setDates, true);
            // if (day.isAfter(firstValue, 'day')) {
            //    tempDay = day.clone().add(1, 'day');
            //    while (tempDay.isAfter(firstValue.clone().add(1, 'day'), 'day')) {
            //       tempArray.push(tempDay);
            //       tempDay = tempDay.subtract(1, 'day').clone();
            //    }
            //    // tempArray.push(firstValue);
            //    setDates([...dates, ...tempArray]);
            // } else if (day.isBefore(firstValue, 'day')) {
            //    tempDay.subtract(1, 'day');
            //    while (tempDay.isBefore(firstValue.clone().subtract(1, 'day'), 'day')) {
            //       console.error('isBefore');
            //       tempArray.push(tempDay);
            //       tempDay = tempDay.add(1, 'day').clone();
            //    }
            //    // tempArray.push(firstValue);
            //    setDates([...dates, ...tempArray]);
            // }

            setFirstValue(null);
            setSecondValue(null);
         }
      }
   });

   useEffect(() => {
      setCalendar(buildCalendar(value));
   }, [value, firstValue, secondValue]);

   useEffect(() => {
      // setCalendar(buildCalendar(value));
      console.error('previewDates = ', previewDates);

      console.error('dates = ', dates);
      const array = dates?.map(date => date.format('DD/MM/YYYY'));
      console.error('dates = ', [...new Set(array)]);

   }, [dates, previewDates]);

   return (
      <div className='calendar'>
         <Header value={value} setValue={setValue}></Header>
         <div className='day-names'>
            {['m', 't', 'w', 't', 'f', 's', 's'].map(d => (
               <div key={uuidv4()} className='week'>
                  {d}
               </div>
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
