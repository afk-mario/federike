import { NavLink } from "react-router-dom";

import { ReactComponent as Logo } from "logo.svg";

import "./styles.css";

function Header() {
  return (
    <header className="header-site">
      <nav className="wrapper">
        <ul className="border cluster">
          <li>
            <NavLink className="logo-wrapper" to="/">
              <Logo className="logo" aria-label="federike logo" />
            </NavLink>
          </li>
          <li>
            <h1 className="title">Federike</h1>
          </li>
          <li>
            <NavLink className="icon" to="settings">
              <span className="icon" aria-label="settings">
                ※
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
