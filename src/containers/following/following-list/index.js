import React, { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { useGetFollowing } from "api/following";

import FollowingRow from "../following-row";

import { getData } from "../following-table/helpers";

import "./styles.css";

function FollowingList({ accountId }) {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [cursor, setCursor] = useState(0);
  const { data, isLoading } = useGetFollowing({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });
  const followers = React.useMemo(() => getData(data), [data]);

  useHotkeys(
    ["down", "j"],
    () => {
      setCursor((prevState) => Math.min(prevState + 1, followers.length));
    },
    [followers.length]
  );
  useHotkeys(
    ["shift+down", "shift+j"],
    () => {
      setCursor((prevState) => Math.min(prevState + 5, followers.length));
    },
    [followers.length]
  );
  useHotkeys(["up", "k"], () => {
    setCursor((prevState) => Math.max(prevState - 1, 0));
  });
  useHotkeys(
    ["shift+up", "shift+k"],
    () => {
      setCursor((prevState) => Math.min(prevState - 5, followers.length));
    },
    [followers.length]
  );

  if (isLoading) return "Loading ...";

  if (followers.length === 0) {
    return (
      <div>
        <h3>No follower yet :(</h3>
      </div>
    );
  }

  const handleItemSelection = ({ id, index, metaKey, hiftKey }) => {
    const s = new Set(selectedItems);
    setCursor(index);
    if (s.has(id)) {
      s.delete(id);
    } else {
      s.add(id);
    }
    setSelectedItems([...s]);
  };

  return (
    <ul className="c-following-lists | stack">
      {followers.map((item, index) => {
        const isSelected = new Set(selectedItems).has(item.id);
        return (
          <li key={item.id}>
            <FollowingRow
              index={index}
              cursor={cursor}
              isSelected={isSelected}
              onItemSelection={handleItemSelection}
              {...item}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FollowingList;
