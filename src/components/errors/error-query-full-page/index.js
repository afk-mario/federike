import React from "react";
import PropTypes from "prop-types";

import ErrorQuery from "components/errors/error-query";
import ErrorFullPage from "components/errors/error-full-page";

function ErrorQueryFullPage(props) {
  const { error } = props;
  const { response, request } = error;

  if (response != null) {
    const { statusText } = response;
    return (
      <ErrorFullPage error={error} title={statusText}>
        <ErrorQuery {...props} />
      </ErrorFullPage>
    );
  }

  if (request !== null) {
    return (
      <ErrorFullPage error={error} title="Failed communicating with the server">
        <ErrorQuery {...props} />
      </ErrorFullPage>
    );
  }

  throw error;
}

ErrorQueryFullPage.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

export default ErrorQueryFullPage;
