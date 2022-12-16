import PropTypes from "prop-types";
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
  username,
  display_name: displayName,
  acct,
  avatar,
  note,
  isSelected,
  onItemSelection,
  onDragStart,
  onItemFocus,
  onItemBlur,
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
      type="button"
      ref={ref}
      className="c-following-row | cluster"
      onClick={onClick}
      onFocus={() => {
        onItemFocus({ index, id });
      }}
      onBlur={() => {
        onItemBlur({ index, id });
      }}
      data-dragging={isDragging && isSelected}
      data-selected={isSelected}
      data-is-current-cursor={cursor === index}
    >
      <div className="c-following-row-content | cluster">
        <FollowingRowAvatar username={username} avatar={avatar} note={note} />
        <div className="c-following-row-info | stack">
          <span className="c-following-row-title | cluster">
            <a
              className="c-following-row-link"
              href={url}
              rel="noreferrer noopener"
              target="_blank"
            >
              ↗
            </a>
            <span className="redacted">{displayName}</span>
          </span>
          <span className="c-following-row-subtitle | redacted">{acct}</span>
          <ListTags id={id} />
        </div>
      </div>
      <span className="c-following-row-drag" ref={dragRef}>
        <span className="icon" aria-label="drag handle">
          Ⅲ
        </span>
      </span>
    </button>
  );
}

FollowingRow.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  cursor: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  display_name: PropTypes.string,
  acct: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  note: PropTypes.string,
  isSelected: PropTypes.bool,
  onItemSelection: PropTypes.func,
  onDragStart: PropTypes.func,
  onItemFocus: PropTypes.func,
  onItemBlur: PropTypes.func,
};

FollowingRow.defaultProps = {
  display_name: null,
  note: null,
  isSelected: false,
  onItemSelection: () => {},
  onDragStart: () => {},
  onItemFocus: () => {},
  onItemBlur: () => {},
};

export default FollowingRow;
