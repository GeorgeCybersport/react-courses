import React from "react";

const CalendarItem = ({
  selectedDay,
  getMonthName,
  dayNames,
  year,
  sendMonth,
  setSelectedDay,
  changeMonth,
  setShowCalendar,
  setOffSet,
  setNext,
}) => {
  const monthName = getMonthName();
  const monthDays = sendMonth();
  return (
    <div className="calendar-container">
      <table id="calendar" cellSpacing="0" cellPadding="1">
        <thead>
          <tr>
            <td
              onClick={() => {
                changeMonth("minus");
              }}
            >
              <b>‹</b>
            </td>
            <td colSpan="5">
              {monthName} {year}
            </td>
            <td
              onClick={() => {
                changeMonth("plus");
              }}
            >
              <b>›</b>
            </td>
          </tr>
          <tr>
            {dayNames.map((day, index) => (
              <td key={index}>{day}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {monthDays.map((week, weekIndex) => (
            <tr key={year + "" + monthName + "" + weekIndex}>
              {week.map((singleDay, index) => (
                <td
                  className={selectedDay === singleDay ? "today" : " "}
                  key={year + "" + monthName + "" + weekIndex + "" + index}
                  onClick={() => {
                    singleDay !== " " && setSelectedDay(singleDay);
                    setShowCalendar(false);
                    setOffSet(0);
                    setNext(false);
                  }}
                >
                  {singleDay}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarItem;
