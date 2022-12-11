import PropTypes from "prop-types";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import ErrorQueryFullPage from "components/errors/error-query-full-page";

function ErrorRouteQueryBoundry({ children }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={ErrorQueryFullPage}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
ErrorRouteQueryBoundry.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorRouteQueryBoundry;
