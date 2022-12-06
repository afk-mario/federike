import React from "react";
import { useDrag, useDragLayer } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import ListTags from "./lists-tags";
import FollowingRowAvatar from "./avatar";

import "./styles.css";

// TODO: optimize furder
function FollowingRow({
  id,
  url,
  index,
  cursor,
  bot,
  username,
  display_name: displayName,
  acct,
  avatar,
  note,
  isSelected,
  onItemSelection,
  onDragStart,
  onItemFocus,
  ...rest
}) {
  const ref = React.useRef();
  const { isDragging } = useDragLayer(
    (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    []
  );

  const [, dragRef, preview] = useDrag(
    () => ({
      type: "following",
      item: () => {
        onDragStart({ id, index });
        return {
          id,
          acct,
        };
      },
    }),
    [onDragStart]
  );

  const onClick = React.useCallback(
    (event) => {
      onItemSelection({ event, index, id });
    },
    [onItemSelection, id, index]
  );

  React.useEffect(() => {
    if (cursor === index) {
      ref.current?.focus({ focusVisible: true });
    }
  }, [cursor, index, ref]);

  React.useEffect(() => {
    preview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }, [preview]);

  return (
    <button
      ref={ref}
      className="c-following-row | cluster"
      onClick={onClick}
      onFocus={() => {
        onItemFocus({ index, id });
      }}
      data-dragging={isDragging && isSelected}
      data-selected={isSelected}
      data-is-current-cursor={cursor === index}
    >
      <div className="c-following-row-content | cluster">
        <FollowingRowAvatar username={username} avatar={avatar} note={note} />
        <div className="c-following-row-content | stack">
          <header className="c-following-row-header | stack">
            <span className="c-following-row-title | cluster">
              <a
                className="c-following-row-link"
                href={url}
                rel="me noreferrer noopener"
                target="_blank"
              >
                ↗
              </a>
              {displayName}
            </span>
            <span className="c-following-row-subtitle">{acct}</span>
            <ListTags id={id} />
          </header>
        </div>
      </div>
      <span className="c-following-row-drag" ref={dragRef}>
        <span className="icon">Ⅲ</span>
      </span>
    </button>
  );
}

export default FollowingRow;
