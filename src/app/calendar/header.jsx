import React from 'react';
import createHandler from 'react-cached-handler';

export default function Header({ value, setValue }) {


   function currMonthName() {
      return value.format('MMMM');
   }

   function currYear() {
      return value.format('YYYY');
   }

   function prevMonth() {
      return value.clone().subtract(1, 'month');
   }

   function nextMonth() {
      return value.clone().add(1, 'month');
   }

   function thisMonth() {
      return value.isSame(new Date(), 'month');
   }

   const setNextMonth = createHandler(() => setValue(nextMonth()));
   const setPreviousMonth = createHandler(() => !thisMonth() && setValue(prevMonth()));

   return (
      <div className='header'>
         <div className='previous' onClick={setPreviousMonth()}>
            {!thisMonth() ? String.fromCharCode(171) : null}
         </div>
         <div className='current'>
            {currMonthName()} {currYear()}
         </div>
         <div className='next' onClick={setNextMonth()}>
            {String.fromCharCode(187)}
         </div>
      </div>
   );
}
