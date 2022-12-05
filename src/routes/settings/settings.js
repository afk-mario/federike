import { Link } from "react-router-dom";

import { useMastodonApp } from "lib/mastodon/provider";

import ThemeRadioGroup from "containers/theme/theme-radio-group";

function Settings() {
  const { auth, app, clear } = useMastodonApp();
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
          <h3>Account</h3>
        </header>
        {auth ? (
          <div className="r-settings-account-wrapper |  cluster">
            <strong>{app.instance}</strong>
            <button onClick={clear}>Log out</button>
          </div>
        ) : (
          <Link to={"instances/add"}>Login</Link>
        )}
      </section>
    </div>
  );
}

export default Settings;
