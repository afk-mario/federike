import { useDragLayer } from "react-dnd";

import "./styles.css";

function FollowingDragLayer({ selectedItems }) {
  const { isDragging, currentOffset } = useDragLayer(
    (monitor) => ({
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }),
    [selectedItems]
  );

  if (!isDragging) return null;

  return (
    <div className="c-following-drag-layer" data-is-dragging={isDragging}>
      <div
        className="c-following-drag-layer-badge-container"
        style={{
          transform: `translate(${currentOffset?.x}px, ${currentOffset?.y}px)`,
        }}
      >
        <span className="c-following-drag-layer-badge">
          {selectedItems.size}
        </span>
      </div>
    </div>
  );
}

export default FollowingDragLayer;