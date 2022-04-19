import React from "react";
import NotesModalWindow from "./NotesModalWindow";
import SingleNote from "./SingleNote";

const Notes = ({ contact, setIsOpen }) => {
  const { notes } = contact;

  const [reductNote, setReductNote] = React.useState(false);
  return (
    <>
      <h4>Заметки:</h4>
      {notes.map((note) => (
        <SingleNote
          setIsOpen={setIsOpen}
          key={note.id}
          note={note}
          contact={contact}
        />
      ))}
      <div className="add-note">
        <button
          type="button"
          className="btn-primary"
          onClick={() => setReductNote(true)}
        >
          Добавить заметку
        </button>
      </div>
      {reductNote && (
        <NotesModalWindow
          action="add"
          contact={contact}
          setReductNote={setReductNote}
        />
      )}
    </>
  );
};

export default Notes;
