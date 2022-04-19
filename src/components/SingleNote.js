import React from "react";
import NotesModalWindow from "./NotesModalWindow";
import { deleteNote } from "../redux/actions/notesActions";
import { useDispatch, useSelector } from "react-redux";

const SingleNote = ({ note, setIsOpen, contact }) => {
  const token = useSelector(({ authReducer }) => authReducer.token);
  const dispatch = useDispatch();
  const [reductNote, setReductNote] = React.useState(false);
  async function removeNote() {
    await dispatch(deleteNote(token, note.id, contact));
    setIsOpen(false);
    setIsOpen(true);
  }
  return (
    <>
      <div key={note.id} className="note-block">
        <div className="note-text">{note.text}</div>
        <div className="note-buttons">
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setReductNote(true)}
            >
              <i className="fas fa-edit"></i>
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={removeNote}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
      {reductNote && (
        <NotesModalWindow
          action="change"
          note={note}
          contact={contact}
          setReductNote={setReductNote}
        />
      )}
    </>
  );
};

export default SingleNote;
