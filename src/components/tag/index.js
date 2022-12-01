import classnames from "classnames";

import "./styles.css";

function Tag({ children, className }) {
  const customClassName = classnames("c-tag", className, {});
  return <span className={customClassName}>{children}</span>;
}

export default Tag;
