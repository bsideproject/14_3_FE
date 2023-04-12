import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar'
import Moment from 'react-moment'

const testData = [
  "2023-04-11", "2023-04-07"
]

const MyCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <>
       <Calendar 
        onChange={() => onChange} 
        value={value} 
        // tileContent={({date,view}) => {
        //   if (testData.find((x) => x === Moment(date).format("DD-MM-YYYY"))) {
        //     return (
        //       <>
        //         <div>
        //           h
        //         </div>
        //       </>
        //     )
        //   }
        // }}
      />
    </>
  )
}

export default MyCalendar