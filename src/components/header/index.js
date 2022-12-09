import { NavLink } from "react-router-dom";

import { ReactComponent as Logo } from "logo.svg";

import "./styles.css";

function Header() {
  return (
    <header className="header-site | wrapper">
      <nav className="border cluster">
        <NavLink className="title-wrapper | cluster" to="/">
          <span className="logo-wrapper">
            <Logo className="logo" aria-label="federike logo" />
          </span>
          <h1 className="title | hide-small">Federike</h1>
        </NavLink>
        <div className="routes-wrapper | cluster">
          <NavLink className="icon" to="about">
            <span className="icon" aria-label="about">
              Ⓘ
            </span>
          </NavLink>
          <NavLink className="icon" to="help">
            <span className="icon" aria-label="help">
              
            </span>
          </NavLink>
          <NavLink className="icon" to="settings">
            <span className="icon" aria-label="settings">
              ◯
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
