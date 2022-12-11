import PropTypes from "prop-types";
import classnames from "classnames";

import "./styles.css";

function CellBool({ getValue, className }) {
  const customClassName = classnames("c-cell-bool", "icon", className, {});
  const value = getValue();
  return <span className={customClassName}>{value ? "" : ""}</span>;
}

CellBool.propTypes = {
  getValue: PropTypes.func,
  className: PropTypes.string,
};

CellBool.defaultProps = {
  getValue: () => {},
  className: null,
};

export default CellBool;
