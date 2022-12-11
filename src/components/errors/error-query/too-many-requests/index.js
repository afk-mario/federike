import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import { useTimer } from "react-timer-hook";

import Time from "components/time";

import "./styles.css";

function ErrorTooManyRequests({ headers, className, onRetry }) {
  const [disabled, setDisabled] = React.useState(true);
  const customClassName = classnames(
    "c-error-too-many-requests",
    "stack",
    className,
    {}
  );
  const rateLimitReset = headers["x-ratelimit-reset"];
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: new Date(rateLimitReset),
    onExpire: () => setDisabled(false),
  });

  const showRetry = days < 1 && hours < 12;

  return (
    <div className={customClassName}>
      <p>
        Communicating with the server failed becase there where too many
        requests, try again{" "}
        {showRetry ? (
          <>
            in{" "}
            <strong>
              <time>
                {String(hours).padStart(2, 0)}:{String(minutes).padStart(2, 0)}:
                {String(seconds).padStart(2, 0)}
              </time>
            </strong>
          </>
        ) : (
          <>
            after{" "}
            <strong>
              <Time formatStr="PP hh:mm:ss">{rateLimitReset}</Time>
            </strong>
          </>
        )}
      </p>
      {showRetry ? (
        <footer>
          <button type="button" onClick={onRetry} disabled={disabled}>
            retry
          </button>
        </footer>
      ) : null}
    </div>
  );
}

ErrorTooManyRequests.propTypes = {
  // statusText: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
  className: PropTypes.string,
  headers: PropTypes.shape({
    "x-ratelimit-reset": PropTypes.string.isRequired,
  }).isRequired,
};

ErrorTooManyRequests.defaultProps = {
  className: null,
};

export default ErrorTooManyRequests;
