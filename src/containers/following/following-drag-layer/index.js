import * as Portal from "@radix-ui/react-portal";

import { useDragLayer } from "react-dnd";
import { useListRouteState } from "routes/lists/context";

import "./styles.css";

function getStyle({ isDragging, currentOffset }) {
  if (!isDragging) {
    return {};
  }

  return {
    transform: `translate(${currentOffset?.x}px, ${currentOffset?.y}px)`,
  };
}

function FollowingDragLayer() {
  const selectedItems = useListRouteState();
  const { isDragging, currentOffset } = useDragLayer(
    (monitor) => ({
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging() && monitor.getItemType() === "following",
    }),
    []
  );

  return (
    <Portal.Root
      className="c-following-drag-layer"
      data-is-dragging={isDragging}
      data-is-empty={selectedItems.size === 0}
    >
      <div
        className="c-following-drag-layer-badge-container"
        style={getStyle({ isDragging, currentOffset })}
      >
        <span className="c-following-drag-layer-badge">
          {selectedItems.size}
        </span>
      </div>
    </Portal.Root>
  );
}

export default FollowingDragLayer;
