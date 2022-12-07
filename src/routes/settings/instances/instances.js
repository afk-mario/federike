import { Link } from "react-router-dom";

import { useMastodonApp } from "lib/mastodon/provider";

function Instances() {
  const instancesList = [];
  const { app, auth, logout } = useMastodonApp();
  return (
    <div className="stack">
      <h2>Instances</h2>
      {app || auth ? (
        <>
          <pre>{JSON.stringify({ app, auth }, null, 2)} </pre>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : null}
      {instancesList.length === 0 ? (
        <p>
          You&apos;re not logged in to any instances.{" "}
          <Link to="add">Log in</Link> to an instance to start using the app.
        </p>
      ) : null}
    </div>
  );
}

export default Instances;
