import React, { useState } from 'react';
import moment from 'moment';

// import './styles.css'

import Calendar from './calendar';

export default function App() {
    // moment.locale('ru');
   const [value, setValue] = useState(moment());

   return <Calendar value={value} setValue={setValue}></Calendar>;
}
