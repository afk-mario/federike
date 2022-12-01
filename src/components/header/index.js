import { NavLink } from "react-router-dom";

import "./styles.css";

function Header() {
  return (
    <header className="header-site">
      <nav className="wrapper">
        <ul className="cluster">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/lists">Lists</NavLink>
          </li>
          <li>
            <NavLink to="/following">Following</NavLink>
          </li>
          <li>
            <NavLink to="/followers">Followers</NavLink>
          </li>
          <li>
            <NavLink to="settings">Settings</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
