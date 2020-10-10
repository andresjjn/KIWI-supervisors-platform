import React, { useState } from "react";
import Moment from "moment";
import Calendar from "./Calendar/Calendar";

function Booking() {
  const [value, setValue] = useState(Moment());
  return (
    <>
      <Calendar value={value} onChange={setValue} />
    </>
  );
}

export default Booking;
