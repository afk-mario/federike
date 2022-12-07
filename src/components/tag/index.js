import PropTypes from "prop-types";
import classnames from "classnames";

import "./styles.css";

function Tag({ children, className }) {
  const customClassName = classnames("c-tag", className, {});
  return <span className={customClassName}>{children}</span>;
}

Tag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Tag.defaultProps = {
  children: null,
  className: null,
};

export default Tag;
