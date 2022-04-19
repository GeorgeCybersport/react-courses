import { HOST_URL, IS_AUTH } from "../keys";

export function getToken(obj) {
  return async (dispatch) => {
    try {
      const result = await fetch(HOST_URL + "token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,
        },
        body: JSON.stringify(obj),
      }).then((res) => res.json());
      if (result.token) {
        dispatch({
          type: IS_AUTH,
          token: result.token,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}
