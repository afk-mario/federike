import PropTypes from "prop-types";
import classnames from "classnames";

import "./styles.css";

function FullPageError({ className, title, error, children }) {
  const customClassName = classnames("c-page-error", "wrapper", className, {});

  return (
    <main className={customClassName}>
      <div className="c-page-error-inner | border">
        <header className="c-page-error-header">
          <h2>{title}</h2>
        </header>
        <section>
          <pre>{error.message}</pre>
        </section>
        {children ? <section>{children}</section> : null}
      </div>
    </main>
  );
}

FullPageError.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  error: PropTypes.instanceOf(Error).isRequired,
  className: PropTypes.string,
};

FullPageError.defaultProps = {
  children: null,
  title: `Something wen't terrible wrong`,
  className: null,
};

export default FullPageError;
