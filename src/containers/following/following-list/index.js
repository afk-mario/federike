import PropTypes from "prop-types";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useGetFollowing } from "api/following";
import { getAllItemsFromPaginatedRes } from "api/helpers";

import { useListRouteState, useListRouteUpdater } from "routes/lists/context";

import Spinner from "components/spinner";
import Message from "components/message";

import { getSortedItems, filterFollowing } from "../helpers";

import FollowingRow from "../following-row";

import "./styles.css";
import { useFollowingState } from "./context";

function FollowingList({ accountId }) {
  const selectedItems = useListRouteState();
  const setSelectedItems = useListRouteUpdater();
  const { sort, filter } = useFollowingState();
  const [isDragging, setIsDragging] = React.useState();
  const [cursor, setCursor] = React.useState(-1);
  const [lastSelectedIndex, setLastSelectedIndex] = React.useState(-1);
  const { data, isLoading } = useGetFollowing({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });

  const unsortedItems = React.useMemo(() => {
    return getAllItemsFromPaginatedRes(data);
  }, [data]);

  const items = React.useMemo(() => {
    return getSortedItems(
      unsortedItems.filter((item) => filterFollowing(item, filter)),
      sort
    );
  }, [unsortedItems, sort, filter]);

  const handleDragStart = ({ id }) => {
    const newItems = new Set(selectedItems);
    if (!newItems.has(id)) {
      newItems.add(id);
    }
    setSelectedItems(newItems);
    setIsDragging(true);
  };

  const handleItemSelection = React.useCallback(
    ({ id, index, event }) => {
      const { metaKey, shiftKey, ctrlKey } = event;
      const newItems = new Set(selectedItems);

      if (ctrlKey || metaKey) {
        if (newItems.has(id)) {
          newItems.delete(id);
        } else {
          newItems.add(id);
        }
        setSelectedItems(newItems);
      } else if (shiftKey) {
        const [start, end] =
          index > lastSelectedIndex
            ? [lastSelectedIndex, index]
            : [index, lastSelectedIndex];
        const subList = items.slice(start, end + 1).map((item) => item.id);
        const a = new Set([...newItems, ...subList]);
        setSelectedItems(a);
      } else if (newItems.has(id) && newItems.size === 1) {
        setSelectedItems(new Set());
      } else {
        setSelectedItems(new Set([id]));
      }

      setLastSelectedIndex(index);
    },
    [lastSelectedIndex, items, selectedItems, setSelectedItems]
  );

  const handleItemFocus = ({ index }) => {
    setCursor(index);
  };

  useHotkeys(
    ["down", "j"],
    () => {
      setCursor((prevState) => Math.min(prevState + 1, items.length));
    },
    [items.length]
  );
  useHotkeys(
    ["shift+down", "shift+j"],
    () => {
      setCursor((prevState) => Math.min(prevState + 5, items.length));
    },
    [items.length]
  );
  useHotkeys(["up", "k"], () => {
    setCursor((prevState) => Math.max(prevState - 1, 0));
  });
  useHotkeys(
    ["shift+up", "shift+k"],
    () => {
      setCursor((prevState) => Math.min(prevState - 5, items.length));
    },
    [items.length]
  );

  if (isLoading)
    return (
      <div className="c-following-lists-loading">
        <Spinner />
      </div>
    );

  if (unsortedItems.length === 0) {
    return (
      <Message>
        <p>
          You don&apos;t seem to <strong>follow</strong> anyone <i>yet</i>.
        </p>
      </Message>
    );
  }

  if (items.length === 0) {
    return (
      <Message>
        <p>
          There are no accounts witht he current <strong>filter</strong>
        </p>
      </Message>
    );
  }

  return (
    <ul className="c-following-lists | stack">
      {items.map((item, index) => {
        const isSelected = selectedItems.has(item.id);
        return (
          <li key={item.id}>
            <FollowingRow
              isDragging={isDragging}
              index={index}
              cursor={cursor}
              isSelected={isSelected}
              onItemSelection={handleItemSelection}
              onItemFocus={handleItemFocus}
              onDragStart={handleDragStart}
              {...item}
            />
          </li>
        );
      })}
    </ul>
  );
}

FollowingList.propTypes = {
  accountId: PropTypes.string,
};

FollowingList.defaultProps = {
  accountId: null,
};

export default FollowingList;
