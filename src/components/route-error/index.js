import FullPageError from "components/full-page-error";
// import PropTypes from "prop-types";

import { useRouteError } from "react-router-dom";

import "./styles.css";

function RouteError() {
  const error = useRouteError();

  return (
    <FullPageError error={error}>
      <p>
        This error is not handled, which means I probably don&apos;t know about
        it, so please fill an issue on{" "}
        <a
          href="https://github.com/afk-mario/federike/"
          rel="noreferrer noopener"
          target="_blank"
        >
          Github
        </a>{" "}
        and I will see what I can do.
      </p>
    </FullPageError>
  );
}

RouteError.propTypes = {};

RouteError.defaultProps = {};

export default RouteError;
