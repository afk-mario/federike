import React from "react";
import * as Select from "@radix-ui/react-select";

import { sortingOptions } from "../constants";

import "./styles.css";

function FollowingSort({ onChange, disabled }) {
  return (
    <Select.Root
      disabled={disabled}
      className="c-sort"
      defaultValue={sortingOptions[0].value}
      onValueChange={onChange}
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

export default FollowingSort;
