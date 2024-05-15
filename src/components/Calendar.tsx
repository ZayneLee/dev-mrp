"use client";

import { useState } from "react";

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
  };

  return (
    <div>
      <input
        type="date"
        value={date.toISOString().split("T")[0]}
        onChange={handleDateChange}
        className="border p-2 rounded"
      />
      <div className="mt-4">
        <p className="text-lg">Selected Date: {date.toDateString()}</p>
      </div>
    </div>
  );
};

export default Calendar;
