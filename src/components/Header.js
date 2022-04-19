import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const links = ["Contacts", "Calendar"];
  const currentLocation = window.location.pathname;
  const [activeItem, setActiveItem] = React.useState(doActive());
  function doActive() {
    if (currentLocation === "/profile/contacts/") return 0;
    else if (currentLocation === "/profile/calendar/") return 1;
  }
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/profile/contacts/" className="navbar-brand">
          Diary
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map((link, index) => (
              <li key={index} className="nav-item">
                <Link
                  to={"/profile/" + link.toLowerCase() + "/"}
                  className={
                    activeItem === index ? "nav-link active" : "nav-link"
                  }
                  onClick={() => {
                    setActiveItem(index);
                  }}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
