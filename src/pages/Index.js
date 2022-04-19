import React from "react";
import Header from "../components/Header";
import ContactsTableData from "../components/ContactsTableData";
import ContactModalWindow from "../components/ContactModalWindow";
import Button from "@material-ui/core/Button";
import "../layout/styles/scss/contacts.scss";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { getContactsList, getMoreContacts } from "../redux/actions/getContacts";

const MainPage = () => {
  const dispatch = useDispatch();
  const [offset, setOffSet] = React.useState(0);
  const [next, setNext] = React.useState(false);
  const [openModalWindow, setOpenModalWindow] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const token = useSelector(({ authReducer }) => authReducer.token);
  const data = useSelector(
    ({ contactsReducer }) => contactsReducer,
    shallowEqual
  );
  const [contacts, setContacts] = React.useState(data);
  async function getContacts() {
    let result = null;
    result = next
      ? await dispatch(getMoreContacts(token, offset))
      : await dispatch(getContactsList(token));
    if (result) {
      setNext(true);
      setOffSet(offset + 5);
    } else setNext(false);
  }
  function reloadPage() {
    setContacts([...data]);
  }
  React.useEffect(() => {
    getContacts();
  }, []);
  React.useEffect(() => {
    if (data) {
      setContacts(data);
      setIsLoaded(true);
    }
  }, [data]);
  return (
    <>
      <div>
        <Header />
        <div className="container">
          <h1>Книга Контактов</h1>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setOpenModalWindow(true)}
          >
            Добавить контакт
          </button>
          <div className="accordion contacts" id="accordionExample">
            {isLoaded && (
              <>
                {contacts.map((contact) => (
                  <ContactsTableData
                    reloadPage={reloadPage}
                    contacts={contacts}
                    key={contact.id}
                    contact={contact}
                  />
                ))}
              </>
            )}
          </div>
          {next && (
            <div className="add-contact">
              <button
                type="button"
                className="btn btn-primary"
                onClick={getContacts}
              >
                Eщё контакты
              </button>
            </div>
          )}
        </div>
      </div>
      {openModalWindow && (
        <ContactModalWindow
          action="add"
          setOpenModalWindow={setOpenModalWindow}
        />
      )}
    </>
  );
};

export default MainPage;
