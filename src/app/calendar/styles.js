function isSelected(day, value) {
   console.log('value ============== ', value);
   if (value) {
      return value?.isSame(day, 'day');
   } else {
      return false;
   }
}

function isInSelected(day, firstValue, secondValue) {
   if (firstValue && secondValue) {
      return day.isBetween(firstValue, secondValue);
      // return value.isSame(day, 'day');
   } else {
      return false;
   }
}

export function beforeToday(day) {
   return day.isBefore(new Date(), 'day');
}

function isToday(day) {
   return day?.isSame(new Date(), 'day');
}

export function daysStyles(day, dayArray) {
   // let include = false;
   // if (Array.isArray(value)) {
   console.log('array value = ', dayArray);
   if (dayArray.length > 1 && dayArray.some(dayValue => dayValue?.isSame(day, 'day'))) {
      return 'selected';
   } else if (dayArray && dayArray.length === 1 && dayArray[0]?.isSame(day, 'day')) {
      return 'selected';
   }
   return '';
   // }
}

export default function dayStyles(day, value, secondValue = null) {
   if (beforeToday(day)) {
      return 'before';
   }

   if (isSelected(day, value) || isInSelected(day, value, secondValue)) {
      return 'selected';
   }
   if (isToday(day)) {
      return 'today';
   }
   return '';
}
