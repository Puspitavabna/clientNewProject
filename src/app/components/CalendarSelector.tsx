"use client";
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar"; // Install with: npm install react-calendar
import "react-calendar/dist/Calendar.css";

const CalendarSelector = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarVisible, setCalendarVisible] = useState(false);

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setCalendarVisible(false); // Close the calendar after selecting a date
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2 p-0 text-lg font-semibold text-[#00000099]">
      {" "}
      {/* Image to Open Calendar */}
      <div onClick={toggleCalendar} className="cursor-pointer">
        <Image
          src="/icons/cal-blog.png"
          alt="Open Calendar"
          width={40}
          height={40}
        />
      </div>
      {/* Calendar */}
      {calendarVisible && (
        <div className="calendar-container absolute top-[60px] z-50">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="custom-calendar"
          />
        </div>
      )}
      {/* Selected Date Display */}
      <div className="text-lg font-semibold text-gray-700">
        {selectedDate ? formatDate(selectedDate) : "No Date Selected"}
      </div>
    </div>
  );
};

export default CalendarSelector;
