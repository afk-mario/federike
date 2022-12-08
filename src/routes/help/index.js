import { Link } from "react-router-dom";

import "./styles.css";

const { REACT_APP_VERSION } = process.env;

function Help() {
  return (
    <section className="r-help | wrapper">
      <div className="r-help-inner | stack border">
        <header className="r-help-header">
          <h2>Help</h2>
        </header>
        <section className="stack">
          <header>
            <h3>How does it work?</h3>
          </header>
          <p>
            <strong>Drag</strong> and <strong>drop</strong> accounts you follow
            on the right side, to lists you have created on the left side.
          </p>

          <p>There are a couple of things to help you out:</p>
          <ul className="stack">
            <li>
              You can select multiple items by using{" "}
              <strong>shift+click</strong> or <strong>⌘/ctrl+click</strong>
            </li>
            <li>
              If the colors are too hard on your eyes you can change them on the{" "}
              <Link to="/settings">Settings</Link> page.
            </li>
            <li>
              If you have multiple accounts selected, you can batch{" "}
              <strong>add</strong>/<strong>remove</strong> them from a{" "}
              <strong>list</strong>.
            </li>
            <li>
              You can <strong>unfollow</strong> an account by dragging and
              dropping it to the <strong>unfollow</strong> button on the left
              side. This <strong>doesn&apos;t</strong> work with multiple
              accounts selected.
            </li>
            <li>
              There is some basic keyboard navigation using the{" "}
              <strong>arrow keys</strong> or <strong>h</strong>/
              <strong>j</strong>.
            </li>
            <li>
              You can <strong>edit</strong> a list title by clicking the{" "}
              <strong>⁝</strong> icon next to the list name.
            </li>
            <li>
              You can <strong>delete</strong> a list by clicking the{" "}
              <strong>⌫</strong> icon next to the list name.
            </li>
            <li>
              You can <strong>filter</strong> the accounts you follow using the
              search bar at the top.
            </li>
            <li>
              You can sort the accounts you follow using the{" "}
              <strong>button</strong> at the top.
            </li>
          </ul>
          <p>
            If you find any issues you can report them on the{" "}
            <strong>
              <a
                href="https://github.com/afk-mario/federike/"
                rel="noreferrer noopener"
                target="_blank"
              >
                Github
              </a>
            </strong>{" "}
            page.
          </p>
        </section>
        <footer className="r-help-footer">
          <span>V.{REACT_APP_VERSION}</span>
        </footer>
      </div>
    </section>
  );
}

export default Help;
