import React from "react";
import EnterEventInfo from "./EnterEventInfo";
import { removeEvent } from "../redux/actions/eventsActions";
import { useDispatch, useSelector } from "react-redux";
import { Render } from "./Posts";

const EventBlock = ({ post }) => {
  const dispatch = useDispatch();
  const token = useSelector(({ authReducer }) => authReducer.token);
  const rerender = React.useContext(Render);
  const [openModalWindow, setOpenModalWindow] = React.useState(false);
  const [showFullText, setShowFullText] = React.useState(false);
  const startDate = post.date_start.slice(0, 10);
  const startTime = post.date_start.slice(11, -1);
  const endDate = post.date_end.slice(0, 10);
  const endTime = post.date_end.slice(11, -1);
  const accordionRef = React.useRef();
  const deleteEvent = async () => {
    const success = await dispatch(removeEvent(token, post.id));
    success && rerender();
  };
  function changeHeight(showFullText) {
    if (showFullText) {
      accordionRef.current.style.maxHeight =
        accordionRef.current.scrollHeight + "px";
    } else {
      accordionRef.current.style.maxHeight = 0 + "px";
    }
  }
  React.useEffect(() => {
    changeHeight(showFullText);
  }, [showFullText]);
  return (
    <div className="event-block">
      <div
        className={showFullText ? "table-event active" : "table-event"}
        onClick={() => {
          setShowFullText(!showFullText);
        }}
      >
        <div>{post.event_name}</div>
        <div className="date">
          <div>
            {startDate} {startTime}
          </div>
          <div>
            {endDate} {endTime}
          </div>
        </div>
      </div>
      {/* {showFullText && ( */}
      {/* <> */}
      <div
        ref={accordionRef}
        className={showFullText ? "full-info active" : "full-info"}
      >
        <div className="event-text">
          <h3>Текст события:</h3>
          {post.to_do}
        </div>
        <div className="event-text">
          <h3>Прикрепленные контакты:</h3>
          {post.contacts.map(
            ({ id, name_first, name_last, name_middle }, index) => (
              <div key={id}>
                {index + 1}) {name_first} {name_middle} {name_last}
              </div>
            )
          )}
        </div>
        <div className="buttons">
          <div>
            <button
              onClick={() => {
                setOpenModalWindow(true);
                setShowFullText(false);
              }}
              className="btn btn-primary"
            >
              <i className="fas fa-edit"></i>
            </button>
          </div>
          <div>
            <button onClick={deleteEvent} className="btn btn-danger">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
      {openModalWindow && (
        <EnterEventInfo
          action="change"
          post={post}
          openModalWindow={setOpenModalWindow}
        />
      )}
      {/* </> */}
      {/* )} */}
    </div>
  );
};

export default EventBlock;
