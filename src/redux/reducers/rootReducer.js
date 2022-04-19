import { combineReducers } from "redux";

import contactsReducer from "./contactsReducer";
import eventsReducer from "./eventsReducer";
import authReducer from "./authReducer";

export default combineReducers({
  contactsReducer,
  eventsReducer,
  authReducer,
});
