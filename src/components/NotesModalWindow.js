import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, changeNote } from "../redux/actions/notesActions";

const NotesModalWindow = ({ setReductNote, note, contact, action }) => {
  const token = useSelector(({ authReducer }) => authReducer.token);
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState(" ");
  const [text, setText] = React.useState("");
  async function addNotes() {
    const success = await dispatch(addNote(token, text, contact));
    success ? setReductNote(false) : setMessage("Введены неверные данные");
  }
  async function changeNotes() {
    const success = await dispatch(changeNote(token, contact, note.id, text));
    success ? setReductNote(false) : setMessage("Введены неверные данные");
  }
  async function enterContactInfo() {
    if (action === "add") {
      addNotes();
    } else if (action === "change") {
      changeNotes();
    }
    setTimeout(() => {
      setMessage(" ");
    }, 3000);
  }
  React.useEffect(() => {
    if (note) setText(note.text);
  }, []);
  return (
    <>
      <div className="eventForm notes">
        <h3>Введите текст заметки</h3>
        <input
          className="form-control"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          placeholder="Text"
        />
        <div className="button-block">
          <button
            onClick={() => enterContactInfo(action)}
            className="btn btn-primary"
          >
            {action === "add" ? "Добавить заметку" : "Редактировать заметку"}
          </button>
        </div>
        <div className="message">{message}</div>
      </div>
      <div
        className="blurBlock"
        onClick={() => {
          setReductNote(false);
        }}
      ></div>
    </>
  );
};

export default NotesModalWindow;
