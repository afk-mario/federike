import PropTypes from "prop-types";

import ErrorTooManyRequests from "./too-many-requests";

function ErrorQuery({ error, resetErrorBoundary }) {
  const { response, request } = error;
  const { data, status } = response || {};

  if (response && status === 429) {
    return <ErrorTooManyRequests onRetry={resetErrorBoundary} {...response} />;
  }

  return (
    <div className="c-query-error">
      {data?.error != null ? <pre>{data.error}</pre> : null}
      <div className="stack">
        <p>There was an error communicating with the instance.</p>
        {request == null && request == null ? (
          <p>Are you connected to the internet?</p>
        ) : null}
        {response == null && request != null ? (
          <p>Is the instance down?</p>
        ) : null}
        <p>
          Is a browser extension <strong>blocking</strong> the request?
        </p>
        <p>
          Are you in <strong>private</strong> browsing mode?
        </p>
        <p>Try refreshing the page.</p>
        <p>
          If you believe this is a problem with your instance, please contact
          the administrator of your instance.
        </p>
        <footer>
          <button type="button" onClick={resetErrorBoundary}>
            retry
          </button>
        </footer>
      </div>
    </div>
  );
}

ErrorQuery.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

ErrorQuery.defaultProps = {};

export default ErrorQuery;
