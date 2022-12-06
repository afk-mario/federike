import React from "react";
import { useDrop } from "react-dnd";
import * as Collapsible from "@radix-ui/react-collapsible";

import { useListRouteState } from "routes/lists/context";

import AccountUnfollowConfirm from "../account-unfollow-confirm";

import "./styles.css";

function AccountUnfollowRow({ listId }) {
  const [account, setAccount] = React.useState(null);
  const selectedItems = useListRouteState();

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "following",
      canDrop: () => {
        return selectedItems.size === 1;
      },
      drop: (account) => {
        setAccount(account);
      },
      collect: (monitor) => {
        return {
          isOver: !!monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
    }),
    [selectedItems]
  );

  const isOpen = account != null;

  return (
    <Collapsible.Root open={isOpen}>
      <li
        className="c-account-unfollow-row | stack"
        ref={drop}
        data-open={isOpen}
        data-is-over={isOver}
        data-can-drop={canDrop}
      >
        <header>
          {isOver && !canDrop ? "Can't batch unfollow" : "Unfollow"}
        </header>
        <Collapsible.Content className="c-account-unfollow-row-content">
          {account ? (
            <AccountUnfollowConfirm
              account={account}
              onCancel={() => setAccount(null)}
              onSuccess={() => setAccount(null)}
            />
          ) : null}
        </Collapsible.Content>
      </li>
    </Collapsible.Root>
  );
}

export default AccountUnfollowRow;
