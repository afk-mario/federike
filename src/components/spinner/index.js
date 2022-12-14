import PropTypes from "prop-types";
import classnames from "classnames";

import "./styles.css";

function Spinner({ className }) {
  const customClassName = classnames("c-spinner", className, {});
  return (
    <svg
      className={customClassName}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M23.1 12C23.5971 12 24.0035 11.5965 23.9663 11.1008C23.871 9.83285 23.5746 8.58609 23.0866 7.4078C22.4835 5.95189 21.5996 4.62902 20.4853 3.51472C19.371 2.40042 18.0481 1.5165 16.5922 0.913445C15.4139 0.425381 14.1672 0.129012 12.8992 0.0337339C12.4035 -0.00351051 12 0.402944 12 0.9V0.9C12 1.39706 12.4037 1.79588 12.8988 1.83968C13.9302 1.93092 14.9435 2.17885 15.9034 2.57643C17.1409 3.08903 18.2653 3.84035 19.2125 4.78751C20.1596 5.73467 20.911 6.85911 21.4236 8.09663C21.8212 9.05647 22.0691 10.0698 22.1603 11.1012C22.2041 11.5963 22.6029 12 23.1 12V12Z"
      />
    </svg>
  );
}

Spinner.propTypes = {
  className: PropTypes.string,
};

Spinner.defaultProps = {
  className: null,
};

export default Spinner;
