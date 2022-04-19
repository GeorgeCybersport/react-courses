import React from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Calendar from "./pages/Calendar.js";
import MainPage from "./pages/Index.js";
import { getToken } from "./redux/actions/authActions.js";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(
    ({ authReducer }) => authReducer.isAuth,
    shallowEqual
  );
  const userData = {
    username: "admin",
    password: "admin123",
  };
  React.useEffect(() => {
    dispatch(getToken(userData));
  }, []);
  return (
    <>
      {isAuth && (
        <Switch>
          <Route path="/profile/contacts/" exact>
            <MainPage />
          </Route>
          <Route path="/profile/calendar/" exact component={Calendar} />
        </Switch>
      )}
    </>
  );
}

export default App;
