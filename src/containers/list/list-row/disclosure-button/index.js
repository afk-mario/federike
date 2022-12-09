import PropTypes from "prop-types";
import classnames from "classnames";

import "./styles.css";

function DisclosureButton({ children, className, ...rest }) {
  const customClassName = classnames(
    "c-list-row-disclosure-button",
    className,
    {}
  );
  return (
    <button
      type="button"
      className={customClassName}
      data-action="edit"
      {...rest}
    >
      {children}
    </button>
  );
}

DisclosureButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DisclosureButton.defaultProps = {
  children: null,
  className: null,
};

export default DisclosureButton;
