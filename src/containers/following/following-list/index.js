import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import { useGetFollowing } from "api/following";

import { useListRouteState, useListRouteUpdater } from "routes/lists/context";

import Spinner from "components/spinner";
import Message from "components/message";

import FollowingRow from "../following-row";
import FollowingLoadMoreButton from "../following-load-more-button";

import { useFollowingState } from "./context";

import "./styles.css";

const isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function FollowingList({ accountId }) {
  const parentRef = React.useRef(null);
  const parentOffsetRef = React.useRef(0);

  const selectedItems = useListRouteState();
  const setSelectedItems = useListRouteUpdater();
  const { sort, items, rawItems } = useFollowingState();
  const [cursor, setCursor] = React.useState(-1);
  const [lastSelectedIndex, setLastSelectedIndex] = React.useState(-1);
  const { isLoading } = useGetFollowing({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });

  React.useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
  }, []);

  const virtualizer = useWindowVirtualizer({
    count: items.length,
    estimateSize: () => 80,
    scrollMargin: parentOffsetRef.current,
  });

  const handleDragStart = ({ id, index }) => {
    const newItems = new Set(selectedItems);
    setLastSelectedIndex(index);
    if (!newItems.has(id)) {
      newItems.clear();
      newItems.add(id);
    }
    setSelectedItems(newItems);
  };

  const handleItemSelection = React.useCallback(
    ({ id, index, event }) => {
      const { metaKey, shiftKey, ctrlKey } = event;
      const newItems = new Set(selectedItems);

      if (ctrlKey || metaKey || isTouch) {
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

  const setCursorClamped = useCallback(
    (delta) => {
      setCursor((prevState) => {
        const newIndex = clamp(prevState + delta, 0, items.length - 1);
        virtualizer.scrollToIndex(newIndex);
        return newIndex;
      });
    },
    [setCursor, items.length, virtualizer]
  );

  useHotkeys(["down", "j"], () => setCursorClamped(1), []);
  useHotkeys(["shift+down", "shift+j"], () => setCursorClamped(5), []);
  useHotkeys(["up", "k"], () => setCursorClamped(-1));
  useHotkeys(["shift+up", "shift+k"], () => setCursorClamped(-5), []);

  if (isLoading)
    return (
      <div className="c-following-lists-loading">
        <Spinner />
      </div>
    );

  const isDSC = sort.includes("dsc");

  if (rawItems.length === 0) {
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
      <>
        <FollowingLoadMoreButton accountId={accountId} />
        <Message>
          <p>
            There are no accounts witht he current <strong>filter</strong>
          </p>
        </Message>
      </>
    );
  }

  return (
    <div className="c-following-lists | stack" ref={parentRef}>
      {!isDSC ? <FollowingLoadMoreButton accountId={accountId} /> : null}
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const { index } = virtualRow;
          const item = items[virtualRow.index];
          const isSelected = selectedItems.has(item.id);
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <FollowingRow
                index={index}
                cursor={cursor}
                isSelected={isSelected}
                onItemSelection={handleItemSelection}
                onItemFocus={handleItemFocus}
                onDragStart={handleDragStart}
                {...item}
              />
            </div>
          );
        })}
      </div>
      {isDSC ? <FollowingLoadMoreButton accountId={accountId} /> : null}
    </div>
  );
}

FollowingList.propTypes = {
  accountId: PropTypes.string,
};

FollowingList.defaultProps = {
  accountId: null,
};

export default FollowingList;
