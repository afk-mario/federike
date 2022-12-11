import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./styles.css";

function ErrorFullPage({ className, title, error, children, footer }) {
  const customClassName = classnames("c-page-error", "wrapper", className, {});

  return (
    <main className={customClassName}>
      <div className="c-page-error-inner | border | stack">
        <header className="c-page-error-header">
          <h2>{title}</h2>
        </header>
        <section className="c-page-error-content">
          {children != null ? (
            children
          ) : (
            <div className="stack">
              <pre>{error.message}</pre>
              <p>
                This error is not handled, which means I probably don&apos;t
                know about it, so please fill an issue on{" "}
                <a
                  href="https://github.com/afk-mario/federike/"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Github
                </a>{" "}
                and I will see what I can do.
              </p>
            </div>
          )}
        </section>
        {footer ? <footer>{footer}</footer> : null}
      </div>
    </main>
  );
}

ErrorFullPage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  error: PropTypes.instanceOf(Error).isRequired,
  className: PropTypes.string,
};

ErrorFullPage.defaultProps = {
  children: null,
  title: `Something wen't terrible wrong`,
  footer: null,
  className: null,
};

export default ErrorFullPage;
