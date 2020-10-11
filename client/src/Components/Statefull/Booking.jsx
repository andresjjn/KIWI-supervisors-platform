import React, { useState } from "react";
import Moment from "moment";
import Calendar from "./Calendar/Calendar";

function Booking() {
  const [value, setValue] = useState(Moment());
  return (
    <>
      <div class='calendar_view'><Calendar value={value} onChange={setValue} /></div>
      <div class='documents'></div>
    </>
  );
}

export default Booking;
