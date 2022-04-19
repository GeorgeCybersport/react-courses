import React from "react";
import Notes from "./Notes";
import ContactModalWindow from "./ContactModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../redux/actions/getContacts";

const ContactsTableData = ({ contact, reloadPage }) => {
  const dispatch = useDispatch();
  const token = useSelector(({ authReducer }) => authReducer.token);
  const removePost = async () => {
    const success = await dispatch(deleteContact(token, contact.id));
    success && reloadPage();
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const [openModalWindow, setOpenModalWindow] = React.useState(false);
  return (
    <>
      <div className="accordion-item contact-block">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#collapse" + contact.id}
          aria-expanded="false"
          aria-controls={"collapse" + contact.id}
        >
          {contact.name_first} {contact.name_middle} {contact.name_last}
        </button>
        <div
          id={"collapse" + contact.id}
          className="accordion-collapse collapse contact-content"
          aria-labelledby={"heading" + contact.id}
          data-bs-parent="#accordionExample"
        >
          <h4>Информация о контакте:</h4>
          <p>
            <span>Имя:</span> {contact.name_first}
          </p>
          <p>
            <span>Фамилия:</span> {contact.name_last}
          </p>
          <p>
            <span>Отчество:</span> {contact.name_middle}
          </p>
          <p>
            <span>Email:</span> {contact.email}
          </p>
          <p>
            <span>Дата рождения:</span> {contact.date_birth}
          </p>
          <p>
            <span>Телефон:</span> {contact.mobile_number}
          </p>
          <Notes contact={contact} setIsOpen={setIsOpen} />
          <div className="buttons">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setOpenModalWindow(true);
                }}
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  removePost();
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {openModalWindow && (
        <ContactModalWindow
          reloadPage={reloadPage}
          action="change"
          contact={contact}
          setOpenModalWindow={setOpenModalWindow}
        />
      )}
    </>
  );
};

export default ContactsTableData;
