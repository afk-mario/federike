import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "./styles.css";

const DisclosureButton = React.forwardRef(
  ({ children, className, ...rest }, ref) => {
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
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

DisclosureButton.displayName = "Disclosure Button";

DisclosureButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DisclosureButton.defaultProps = {
  children: null,
  className: null,
};

export default DisclosureButton;
