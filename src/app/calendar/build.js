export default function buildCalendar(value) {
   const startDay = value.clone().startOf('month').startOf('week').add(1, 'day');
   const endDay = value.clone().endOf('month').endOf('week').add(1, 'day');

   const day = startDay.clone().subtract(1, 'day');
   const calendar = [];

   while (day.isBefore(endDay, 'day')) {
      calendar.push(
         Array(7)
            .fill(0)
            .map(() => day.add(1, 'day').clone())
      );
   }

   return calendar;
}
