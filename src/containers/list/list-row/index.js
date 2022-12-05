import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@reach/disclosure";
import { useDrop } from "react-dnd";

import ListDeleteButton from "../list-delete-button";
import ListEditForm from "../list-edit-form";

import Add from "./add";
import Remove from "./remove";

import "./styles.css";
import { useGetListAccounts } from "api/lists";

export function getIsInList({ item, listId }) {
  return item.lists.find((item) => item.id === listId) != null;
}

function ListRow({ title, id: listId, is_exclusive, selectedItems }) {
  const { data } = useGetListAccounts({ listId });
  const [open, setOpen] = React.useState(false);

  let [{ isOver }, drop] = useDrop(
    () => ({
      accept: "following",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    []
  );

  const accounts = data?.data || [];

  return (
    <li className="c-list-row | stack" data-open={open}>
      <Disclosure open={open} onChange={() => setOpen(!open)}>
        <header
          className="c-list-row-header | cluster"
          ref={drop}
          data-is-over={isOver}
        >
          {isOver ? (
            <>
              <Add
                listId={listId}
                selectedItems={selectedItems}
                accounts={accounts}
              />
              <span className="c-list-row-label">{title}</span>
              <Remove
                listId={listId}
                selectedItems={selectedItems}
                accounts={accounts}
              />
            </>
          ) : (
            <>
              <DisclosureButton className="c-list-row-disclosure-button">
                <span className="icon">{open ? "↓" : "₸"}</span>
              </DisclosureButton>
              <span className="c-list-row-label">{title}</span>
              <ListDeleteButton listId={listId} />
            </>
          )}
        </header>
        <DisclosurePanel>
          <ListEditForm
            listId={listId}
            title={title}
            onSuccess={() => {
              setOpen(false);
            }}
          />
        </DisclosurePanel>
      </Disclosure>
    </li>
  );
}

export default ListRow;
