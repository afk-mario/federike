import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import useDebounce from "lib/hooks/use-debounce";

import { useFollowingUpdater } from "../following-list/context";

function FollowingFilter({ disabled }) {
  const { setFilter } = useFollowingUpdater();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setFilter(debouncedValue);
  }, [debouncedValue, setFilter]);

  return (
    <input
      value={value}
      onChange={handleChange}
      type="text"
      className="c-following-filter"
      placeholder="filter"
      disabled={disabled}
    />
  );
}
FollowingFilter.propTypes = {
  disabled: PropTypes.bool,
};

FollowingFilter.defaultProps = {
  disabled: false,
};

export default FollowingFilter;
