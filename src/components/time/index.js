import PropTypes from "prop-types";
import classnames from "classnames";

import { parseISO, format } from "date-fns";

import { enUS } from "date-fns/locale";

export const serverDateFormat = "yyyy-MM-dd";
export const localizedTimeAndDate = "p - PP";
export const localizedDateWithTime = "P p";

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
function formatDate(date, formatStr = "PP") {
  return format(date, formatStr, {
    locale: enUS,
  });
}

function Time({ className, children, formatStr }) {
  const date = parseISO(children);
  const formatted = formatDate(date, formatStr);
  const customClassName = classnames("time", className, {});
  return <time className={customClassName}>{formatted}</time>;
}
Time.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  formatStr: PropTypes.string,
};

Time.defaultProps = {
  formatStr: undefined,
  className: null,
};

export default Time;
