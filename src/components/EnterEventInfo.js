import React from "react";
import { addToEvents, changeContactList } from "../redux/actions/eventsActions";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Render } from "./Posts";
import { getContactsList } from "../redux/actions/getContacts";
import SelectContact from "./SelectContact";
import UserList from "./UserList";
import Cleave from "cleave.js/react";

const EnterEventInfo = ({ openModalWindow, action, post }) => {
  const rerender = React.useContext(Render);
  const dispatch = useDispatch();
  const data = useSelector(
    ({ contactsReducer }) => contactsReducer,
    shallowEqual
  );
  const token = useSelector(({ authReducer }) => authReducer.token);
  const [users, setUsers] = React.useState(post ? post.contacts : []);
  const [contacts, setContacts] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [message, setMessage] = React.useState(" ");
  const [postName, setPostName] = React.useState("");
  const [dateStart, setDateStart] = React.useState("");
  const [timeStart, setTimeStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [timeEnd, setTimeEnd] = React.useState("");
  const [postText, setPostText] = React.useState("");
  async function addEvent(obj) {
    const success = await dispatch(addToEvents(token, obj));
    success ? openModalWindow(false) : setMessage("Введены неверные данные");
  }
  async function changeEvent(obj) {
    for (let key in obj) {
      if (!obj[key]) delete obj[key];
      if (key === "date_start" && obj[key] === "T") delete obj[key];
      if (key === "date_end" && obj[key] === "T") delete obj[key];
    }
    const success = await dispatch(changeContactList(token, obj, post.id));
    if (success) {
      openModalWindow(false);
      setTimeout(() => {
        alert("Событие успешно изменено");
      }, 0);
    } else setMessage("Введены неверные данные");
    rerender();
  }
  async function enterEventInfo() {
    const date_start = dateStart + "T" + timeStart;
    const date_end = dateEnd + "T" + timeEnd;
    const usersId = users.map((user) => user.id);
    const obj = {
      contact: usersId,
      date_start,
      date_end,
      event_name: postName,
      to_do: postText,
    };
    if (action === "add") {
      addEvent(obj);
    } else if (action === "change") {
      changeEvent(obj);
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }
  async function getContacts() {
    const result = await dispatch(getContactsList(token, 1000));
    result && setIsLoaded(true);
  }
  function setData() {
    if (post) {
      setPostName(post.event_name);
      setDateStart(post.date_start.slice(0, 10));
      setTimeStart(post.date_start.slice(11, -4));
      setDateEnd(post.date_end.slice(0, 10));
      setTimeEnd(post.date_end.slice(11, -4));
      setPostText(post.to_do);
    }
  }
  React.useEffect(() => {
    if (data) {
      setContacts([...data]);
      setIsLoaded(true);
    }
  }, [data]);
  React.useEffect(() => {
    setData();
    getContacts();
  }, []);
  return (
    <>
      <div className="eventForm">
        <h4>Введите название события</h4>
        <input
          className="form-control"
          value={postName}
          onChange={(event) => {
            setPostName(event.target.value);
          }}
          placeholder="Name"
        />
        <h4>Введите дату начала</h4>
        <Cleave
          className="form-control"
          options={{ date: true, delimiter: "-", datePattern: ["Y", "m", "d"] }}
          value={dateStart}
          onChange={(event) => {
            setDateStart(event.target.value);
          }}
          placeholder="Start Date"
        />
        <h4>Введите время начала</h4>
        <Cleave
          className="form-control"
          value={timeStart}
          onChange={(event) => {
            setTimeStart(event.target.value);
          }}
          placeholder="Start Time"
          options={{ time: true, delimiter: ":", timePattern: ["h", "m"] }}
        />
        <h4>Введите дату конца</h4>
        <Cleave
          className="form-control"
          value={dateEnd}
          onChange={(event) => {
            setDateEnd(event.target.value);
          }}
          options={{ date: true, delimiter: "-", datePattern: ["Y", "m", "d"] }}
          placeholder="End Date"
        />
        <h4>Введите время конца</h4>
        <Cleave
          className="form-control"
          value={timeEnd}
          onChange={(event) => {
            event.target.value.length <= 5 && setTimeEnd(event.target.value);
          }}
          options={{ time: true, delimiter: ":", timePattern: ["h", "m"] }}
          placeholder="End Time"
        />
        {isLoaded && (
          <>
            <h4>Выберите пользователей, которых вы хотите добавить</h4>
            <UserList users={users} setUsers={setUsers} />
            <SelectContact
              users={users}
              setUsers={setUsers}
              contacts={contacts}
            />
          </>
        )}
        <h4>Введите текст события</h4>
        <textarea
          className="form-control"
          value={postText}
          onChange={(event) => {
            setPostText(event.target.value);
          }}
          placeholder="Text"
        />
        <div className="button-block">
          <button
            className="btn btn-primary"
            onClick={enterEventInfo}
            variant="contained"
            color="primary"
          >
            {action === "add" ? "Добавить событие" : "Редактировать событие"}
          </button>
        </div>
        <div className="message">{message}</div>
      </div>
      <div
        className="blurBlock"
        onClick={() => {
          openModalWindow(false);
        }}
      ></div>
    </>
  );
};

export default EnterEventInfo;
