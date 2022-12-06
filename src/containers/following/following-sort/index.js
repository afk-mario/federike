import PropTypes from "prop-types";
import React, { useCallback } from "react";
import * as Select from "@radix-ui/react-select";

import { sortingOptions } from "../constants";

import "./styles.css";
import { useFollowingUpdater } from "../following-list/context";

function FollowingSort({ onChange, disabled }) {
  const { setSort } = useFollowingUpdater();

  const handleValueChange = useCallback(
    (value) => {
      setSort(value);
      onChange(value);
    },
    [setSort, onChange]
  );

  return (
    <Select.Root
      disabled={disabled}
      className="c-sort"
      defaultValue={sortingOptions[0].value}
      onValueChange={handleValueChange}
    >
      <Select.Trigger className="c-sort-trigger" aria-label="Food">
        <Select.Value placeholder="Sort" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="c-sort-content">
          <Select.ScrollUpButton className="c-sort-scroll-button">
            ↑
          </Select.ScrollUpButton>
          <Select.Viewport className="c-sort-viewport">
            {sortingOptions.map((item) => {
              return (
                <Select.Item
                  className="c-sort-item | cluster"
                  key={item.value}
                  value={item.value}
                >
                  <Select.ItemText>{item.label}</Select.ItemText>
                </Select.Item>
              );
            })}
          </Select.Viewport>
          <Select.ScrollDownButton className="c-sort-scroll-button">
            ↓
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

FollowingSort.propTypes = {
  onChange: PropTypes.func,
};

FollowingSort.defaultProps = {
  onChange: () => {},
};

export default FollowingSort;
