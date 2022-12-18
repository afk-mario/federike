import { Link } from "react-router-dom";

import { useMastodonApp } from "lib/mastodon";

import ThemeRadioGroup from "containers/theme/theme-radio-group";
import ThemeDensityRadioGroup from "containers/theme/theme-density-group";
import ThemeBorderRadiusGroup from "containers/theme/theme-border-radius-group";
import ThemeRedactedCheckbox from "containers/theme/theme-redacted-checkbox";

const { REACT_APP_VERSION } = process.env;

function Settings() {
  const { auth, app, logout } = useMastodonApp();
  return (
    <div className="r-settings-root | stack | border">
      <header className="r-settings-root-header">
        <h2 className="r-settings-root-title">Settings</h2>
      </header>
      <section className="stack">
        <header>
          <h3>Theme</h3>
        </header>
        <ThemeRadioGroup />
      </section>
      <section className="stack">
        <header>
          <h3>Density</h3>
        </header>
        <ThemeDensityRadioGroup />
      </section>
      <section className="stack">
        <header>
          <h3>Border Radius</h3>
        </header>
        <ThemeBorderRadiusGroup />
      </section>
      <section className="stack">
        <header>
          <h3>Redacted</h3>
        </header>
        <ThemeRedactedCheckbox />
      </section>
      <section className="stack">
        <header>
          <h3>Account</h3>
        </header>
        {auth ? (
          <div className="r-settings-account-wrapper |  cluster">
            <strong>{app.instance}</strong>
            <button type="button" onClick={logout}>
              Log out
            </button>
          </div>
        ) : (
          <Link to="instances/add">Login</Link>
        )}
      </section>
      <footer>
        <span>V.{REACT_APP_VERSION}</span>
      </footer>
    </div>
  );
}

export default Settings;
