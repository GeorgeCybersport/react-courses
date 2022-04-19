import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToContactList,
  changeContactList,
} from "../redux/actions/getContacts";
import Cleave from "cleave.js/react";

const ContactModalWindow = ({
  setOpenModalWindow,
  action,
  contact,
  reloadPage,
}) => {
  const token = useSelector(({ authReducer }) => authReducer.token);
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [secondname, setSecondname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [date, setDate] = React.useState("");
  async function enterContactInfo() {
    const obj = {
      name_first: name,
      name_middle: secondname,
      name_last: surname,
      email,
      date_birth: date,
      mobile_number: phone,
    };
    if (action === "add") {
      for (let key in obj) {
        if (obj[`${key}`] === "") delete obj[`${key}`];
      }
      const success = await dispatch(addToContactList(token, obj));
      if (success) {
        setOpenModalWindow(false);
        setTimeout(() => {
          alert("контакт успешно добавлен");
        }, 0);
      } else setMessage("Введены неверные данные");
    } else if (action === "change") {
      for (let key in obj) {
        if (obj[`${key}`] === "") delete obj[`${key}`];
      }
      const success = await dispatch(changeContactList(token, obj, contact.id));
      success && reloadPage();
      success
        ? setOpenModalWindow(false)
        : setMessage("Введены неверные данные");
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }
  function setData() {
    if (contact) {
      setName(contact.name_first);
      setSurname(contact.name_last);
      setSecondname(contact.name_middle);
      setEmail(contact.email);
      setPhone(contact.mobile_number);
      setDate(contact.date_birth);
    }
  }
  React.useEffect(() => {
    setData();
  }, []);
  return (
    <>
      <div className="eventForm">
        <h3>Введите имя</h3>
        <input
          className="form-control"
          value={name}
          onChange={(event) => setName(event.target.value)}
          label="Name"
        />
        <h3>Введите фамилию</h3>
        <input
          className="form-control"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
          label="Last name"
        />
        <h3>Введите отчество</h3>
        <input
          className="form-control"
          value={secondname}
          onChange={(event) => setSecondname(event.target.value)}
          label="Second name"
        />
        <h3>Введите номер телефона</h3>
        <Cleave
          className="form-control"
          options={{
            numericOnly: true,
            prefix: "+7",
            delimiter: " ",
            blocks: [2, 3, 3, 2, 2],
          }}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          label="Phone number"
        />
        <h3>Введите email</h3>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <h3>Введите дату рождения</h3>
        <Cleave
          className="form-control"
          options={{ date: true, delimiter: "-", datePattern: ["Y", "m", "d"] }}
          value={date}
          onChange={(event) => setDate(event.target.value)}
          placeholder="Date of birthday"
        />
        <div className="button-block">
          <button
            type="button"
            className="btn btn-primary"
            onClick={enterContactInfo}
            variant="contained"
            color="primary"
          >
            {action === "add" ? "Добавить контакт" : "Изменить контакт"}
          </button>
        </div>
        <div className="message">{message}</div>
      </div>
      <div
        className="blurBlock"
        onClick={() => {
          setOpenModalWindow(false);
        }}
      ></div>
    </>
  );
};

export default ContactModalWindow;
