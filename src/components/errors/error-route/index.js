// import PropTypes from "prop-types";
import { useRouteError } from "react-router-dom";

import Header from "components/header";

import ErrorFullPage from "../error-full-page";

function ErrorRoute() {
  const error = useRouteError();
  return (
    <>
      <Header />
      <ErrorFullPage error={error} />
    </>
  );
}

ErrorRoute.propTypes = {};

ErrorRoute.defaultProps = {};

export default ErrorRoute;
