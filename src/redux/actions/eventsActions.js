import {
  GET_EVENTS,
  ADD_EVENT,
  GET_MORE_EVENTS,
  CHANGE_EVENT,
  REMOVE_EVENT,
  HOST_URL,
} from "../keys";

export function getEventsList(token, obj) {
  return async (dispatch) => {
    const url = HOST_URL + "event/?date_end_hi=" + obj.date_start_hi;
    const result = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': "Token " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.results) {
          dispatch({
            type: GET_EVENTS,
            payload: result.results,
          });
          return result.next;
        }
      });
    return result;
  };
}
export function getMoreEvents(token, obj, offset) {
  return async (dispatch) => {
    const url =
      HOST_URL + "event/?date_end_hi=" +
      obj.date_start_hi +
      "&limit=5&offset=" +
      offset;
    const result = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': "Token " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.results) {
          dispatch({
            type: GET_MORE_EVENTS,
            payload: result.results,
          });
          return result.next;
        }
      });
    return result;
  };
}
export function addToEvents(token, obj) {
  if (obj) {
    return async (dispatch) => {
      const succes = await fetch(HOST_URL + "event/", {
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Token " + token,
          //"X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value
        },
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.id) {
            dispatch({
              type: ADD_EVENT,
              payload: result,
            });
            return true;
          }
        });
      return succes;
    };
  }
}
export function changeContactList(token, obj, id) {
  return async (dispatch) => {
    const succes = await fetch(
      HOST_URL + "event/" + id + "/",
      {
        headers: {
          'Authorization': "Token " + token,
          "Content-Type": "application/json",
          //"X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
        },
        method: "PATCH",
        body: JSON.stringify(obj),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          dispatch({
            type: CHANGE_EVENT,
            payload: result.success,
          });
          return true;
        }
      });
    return succes;
  };
}
export function removeEvent(token, id) {
  return async (dispatch) => {
    const result = await fetch(
      HOST_URL + "event/" + id + "/",
      {
        headers: {
          'Authorization': "Token " + token,
          "Content-Type": "application/json",
          //"X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
        },
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.success === "object successfully destroy") {
          dispatch({
            type: REMOVE_EVENT,
            payload: id,
          });
          return true;
        }
      });
    return result;
  };
}
