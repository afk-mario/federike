import { Link } from "react-router-dom";

import { useMastodonApp } from "lib/mastodon/provider";

import { ReactComponent as Logo } from "logo.svg";

const { REACT_APP_VERSION } = process.env;

function Public() {
  const { auth } = useMastodonApp();
  return (
    <section className="r-public | wrapper">
      <div className="r-public-inner | stack border">
        <div className="stack">
          <Logo className="logo" />
          <p>
            Welcome to{" "}
            <strong>
              <i>Federike</i>
            </strong>
            , a web app made by{" "}
            <strong>
              <a
                href="https://merveilles.town/@mario_afk"
                rel="noreferrer noopener"
                target="_blank"
              >
                AFK
              </a>
            </strong>{" "}
            to help you organize your <strong>Mastodon</strong> using lists.
          </p>
          <p>
            You can check out the source code at{" "}
            <strong>
              <a
                href="https://github.com/afk-mario/federike/"
                rel="noreferrer noopener"
                target="_blank"
              >
                Github
              </a>
            </strong>
            .
          </p>
          {auth == null ? (
            <p>
              <strong>
                <Link to="/settings/instances/add">Login</Link>
              </strong>{" "}
              to start.
            </p>
          ) : (
            <p>
              If you need{" "}
              <Link to="/help">
                <strong>help</strong>
              </Link>
              , make sure to check out the{" "}
              <strong>
                <Link to="/help">help section</Link>
              </strong>
              .
            </p>
          )}
        </div>
        <footer>
          <span>V.{REACT_APP_VERSION}</span>
        </footer>
      </div>
    </section>
  );
}

export default Public;
