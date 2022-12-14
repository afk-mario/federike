import PropTypes from "prop-types";
import classnames from "classnames";

import "./styles.css";

function Message({ children, className, ...rest }) {
  const customClassName = classnames("c-message", className, {});
  return (
    <div className={customClassName} {...rest}>
      {children}
    </div>
  );
}

Message.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Message.defaultProps = {
  children: null,
  className: null,
};

export default Message;
