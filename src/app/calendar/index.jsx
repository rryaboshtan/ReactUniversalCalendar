import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import buildCalendar from './build';

import './styles.css';

export default function Calendar() {
   const [calendar, setCalendar] = useState([]);
   const [value, setValue] = useState(moment());

   useEffect(() => {
      setCalendar(buildCalendar(value));
   }, [value]);

   function isSelected(day) {
      return value.isSame(day, 'day');
   }

   function beforeToday(day) {
      return day.isBefore(new Date(), 'day');
   }

   function isToday(day) {
      return day.isSame(new Date(), 'day');
   }

   function dayStyles(day) {
      if (beforeToday(day)) {
         return 'before';
      }
      if (isSelected(day)) {
         return 'selected';
      }
      if (isToday(day)) {
         return 'today';
      }
      return '';
   }

   return (
      <div className='calendar'>
         {calendar.map(week => (
            <div key={uuidv4()}>
               {week.map(day => (
                  <div className='day' onClick={() => setValue(day)} key={uuidv4()}>
                     <div className={value.isSame(day, 'day') ? 'selected' : ''}>{day.format('D').toString()}</div>
                  </div>
               ))}
            </div>
         ))}
      </div>
   );
}
