import React from "react";
import EventBlock from "./EventBlock";
import EnterEventInfo from "./EnterEventInfo";
import Button from "@material-ui/core/Button";
import { shallowEqual, useSelector } from "react-redux";

export const Render = React.createContext();

const Posts = ({ posts, setPosts }) => {
  const postsData = useSelector(
    ({ eventsReducer }) => eventsReducer,
    shallowEqual
  );
  const [openModalWindow, setOpenModalWindow] = React.useState(false);
  function rerender() {
    setPosts([...postsData]);
  }
  return (
    <Render.Provider value={rerender}>
      <button
        onClick={() => {
          setOpenModalWindow(true);
        }}
        className="btn btn-primary"
      >
        Добавить событие
      </button>
      <div className="action-table">
        <div className="table-date">
          <div className="table-header">
            <div>Название события</div>
            <div className="date">
              <div>Дата начала</div>
              <div>Дата конца</div>
            </div>
          </div>
        </div>
        {posts.map((post) => (
          <EventBlock key={post.id} post={post} />
        ))}
      </div>
      {openModalWindow && (
        <EnterEventInfo action="add" openModalWindow={setOpenModalWindow} />
      )}
    </Render.Provider>
  );
};

export default Posts;
