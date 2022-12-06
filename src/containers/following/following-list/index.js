import React from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useGetFollowing } from "api/following";
import { getAllItemsFromPaginatedRes } from "api/helpers";

import Spinner from "components/spinner";

import { getSortedItems } from "./helpers";

import FollowingRow from "../following-row";

import "./styles.css";
import { useListRouteState, useListRouteUpdater } from "routes/lists/context";
import { useFollowingState } from "./context";

function FollowingList({ accountId }) {
  const selectedItems = useListRouteState();
  const setSelectedItems = useListRouteUpdater();
  const { sort } = useFollowingState();
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

  const items = getSortedItems([...unsortedItems], sort);

  const handleDragStart = ({ id, index }) => {
    const newItems = new Set(selectedItems);
    if (!newItems.has(id)) {
      newItems.add(id);
    }
    setSelectedItems(newItems);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleItemSelection = ({ id, index, event }) => {
    setCursor(index);

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
      const subList = items.slice(start, end + 1).map(({ id }) => id);
      const a = new Set([...newItems, ...subList]);
      setSelectedItems(a);
    } else {
      if (newItems.has(id) && newItems.size === 1) {
        setSelectedItems(new Set());
      } else {
        setSelectedItems(new Set([id]));
      }
    }

    setLastSelectedIndex(index);
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

  if (items.length === 0) {
    return (
      <div>
        <h3>No follower yet :(</h3>
      </div>
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
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              {...item}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FollowingList;
