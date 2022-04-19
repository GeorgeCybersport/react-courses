import React from "react";
import CalendarItem from "../components/CalendarItem";
import Header from "../components/Header";
import "../layout/styles/scss/calendar.scss";
import Posts from "../components/Posts";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { months, dateMonth, dayNames } from "../data/monthNames";
import { getEventsList, getMoreEvents } from "../redux/actions/eventsActions";

const Calendar = () => {
  const dispatch = useDispatch();
  const token = useSelector(({ authReducer }) => authReducer.token);
  const [offset, setOffSet] = React.useState(0);
  const [next, setNext] = React.useState(false);
  const postsData = useSelector(
    ({ eventsReducer }) => eventsReducer,
    shallowEqual
  );
  const [posts, setPosts] = React.useState(postsData);
  const [day, setDay] = React.useState(new Date().getDate());
  const [monthNumber, setMonthNumber] = React.useState(new Date().getMonth());
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [showCalendar, setShowCalendar] = React.useState(false);
  const getLastDate = () => new Date(year, monthNumber + 1, 0).getDate();
  const getFirstDayName = () =>
    new Date(year, monthNumber, 1).getDay() === 0
      ? 6
      : new Date(year, monthNumber, 1).getDay() - 1;
  const getMonthName = () => months[monthNumber];
  function minusMonth() {
    if (monthNumber > 0) {
      setMonthNumber(monthNumber - 1);
    } else {
      setMonthNumber(11);
      setYear(year - 1);
    }
  }
  console.log(next);
  function plusMonth() {
    if (monthNumber < 11) {
      setMonthNumber(monthNumber + 1);
    } else {
      setMonthNumber(0);
      setYear(year + 1);
    }
  }
  async function getEvents() {
    let number = monthNumber + 1;
    if (number < 10) {
      number = "0" + number;
    } else number = number;
    const currentDate = year + "-" + number + "-" + day + "T00:00";
    const obj = {
      date_start_hi: currentDate,
    };
    let result = null;
    if (next) {
      result = await dispatch(getMoreEvents(token, obj, offset));
    } else {
      result = await dispatch(getEventsList(token, obj));
    }
    if (result) {
      setNext(true);
      const data = offset + 5;
      setOffSet(data);
    } else setNext(false);
  }

  function changeMonth(action) {
    if (action === "minus") minusMonth();
    else if (action === "plus") plusMonth();
    setOffSet(0);
    setNext(false);
  }
  function sendMonth() {
    const newArr = [];
    const monthLenght = getLastDate();
    const firstDay = getFirstDayName();
    let dayCounter = 0;
    for (let i = 0; i < 6; i++) {
      let arr = [];
      if (i === 0) {
        dayNames.forEach((day, index) => {
          index < firstDay ? arr.push(" ") : arr.push(++dayCounter);
        });
      } else {
        dayNames.forEach(() => {
          dayCounter < monthLenght ? arr.push(++dayCounter) : arr.push(" ");
        });
      }
      newArr.push(arr);
    }
    return newArr;
  }
  React.useEffect(() => {
    if (day && monthNumber) getEvents();
  }, [day, monthNumber]);
  React.useEffect(() => {
    setPosts([...postsData]);
  }, [postsData]);
  return (
    <>
      <Header />
      <div className="container">
        <div className="content">
          <header className="datePicker">
            <h2>
              Выбранная дата: {day} {dateMonth[monthNumber]} {year}
            </h2>
            <div className="showCalendar">
              <p
                onClick={() => {
                  setShowCalendar(!showCalendar);
                }}
              >
                Выбрать дату <i className="far fa-calendar"></i>
              </p>
            </div>
            {showCalendar && (
              <CalendarItem
                setShowCalendar={setShowCalendar}
                selectedDay={day}
                getMonthName={getMonthName}
                dayNames={dayNames}
                year={year}
                sendMonth={sendMonth}
                setSelectedDay={setDay}
                changeMonth={changeMonth}
                setOffSet={setOffSet}
                setNext={setNext}
              />
            )}
          </header>
          <Posts posts={posts} setPosts={setPosts} />

          {next && (
            <div className="add-contact">
              <button
                type="button"
                className="btn btn-primary"
                onClick={getEvents}
              >
                Eщё посты
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
