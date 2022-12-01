import React from "react";
import { useInView } from "react-intersection-observer";
import { useDrag } from "react-dnd";

import { useGetFollowingLists } from "api/lists";

import Tag from "components/tag";

import "./styles.css";

function FollowingRow({
  id,
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
  ...rest
}) {
  const ref = React.useRef();
  const { ref: inViewRef, inView } = useInView();
  const { data } = useGetFollowingLists({
    accountId: id,
    config: { enabled: inView },
  });
  const lists = data?.data || [];

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "following",
      item: { id, lists },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [lists]
  );

  const onClick = (e) => {
    onItemSelection({ metaKey: e.metaKey, shiftKey: e.shiftKey, index, id });
  };

  React.useEffect(() => {
    if (cursor === index) {
      ref.current?.focus({ focusVisible: true });
    }
  }, [cursor, index, ref]);

  return (
    <button
      ref={ref}
      className="c-following-row | cluster"
      onClick={onClick}
      data-dragging={isDragging}
      data-selected={isSelected}
      data-is-current-cursor={cursor === index}
    >
      <div className="c-following-row-avatar-wrapper" ref={inViewRef}>
        <img
          className="c-following-row-avatar"
          src={avatar}
          alt={`${username} avatar`}
        />
      </div>
      <div className="c-following-row-content | stack">
        <header className="c-following-row-header | stack">
          <span className="c-following-row-title">{displayName}</span>
          <span className="c-following-row-subtitle">{acct}</span>
          {lists.length > 0 ? (
            <ul className="c-following-row-tag-list | cluster">
              {lists.map((item) => (
                <li key={item.id}>
                  <Tag>{item.title}</Tag>
                </li>
              ))}
            </ul>
          ) : null}
        </header>
      </div>
      <span className="c-following-row-drag" ref={dragRef}>
        ¤
      </span>
    </button>
  );
}

export default FollowingRow;
