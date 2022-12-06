import { useListRouteState } from "routes/lists/context";

import "./styles.css";

function FollowingSelectCounter() {
  const size = useListRouteState().size;

  return (
    <span className="c-following-select-counter" data-size={size}>
      {size}
    </span>
  );
}

export default FollowingSelectCounter;
