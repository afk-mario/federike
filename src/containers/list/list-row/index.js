import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
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
  const [action, setAction] = React.useState(null);

  let [{ isOver }, drop] = useDrop(
    () => ({
      accept: "following",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    []
  );

  const accounts = data || [];

  return (
    <li className="c-list-row | stack" data-open={open} data-action={action}>
      <Collapsible.Root
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) setAction(null);
        }}
      >
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
              <Collapsible.Trigger asChild>
                <button
                  className="c-list-row-disclosure-button"
                  data-action="edit"
                  onClick={() => {
                    setAction("edit");
                  }}
                >
                  <span className="icon">
                    {open && action === "edit" ? "↓" : "₸"}
                  </span>
                </button>
              </Collapsible.Trigger>
              <span className="c-list-row-label">{title}</span>
              <Collapsible.Trigger asChild>
                <button
                  className="c-list-row-disclosure-button"
                  data-action="delete"
                  onClick={() => {
                    setAction("delete");
                  }}
                >
                  <span className="icon">
                    {open && action === "delete" ? "↓" : "⌫"}
                  </span>
                </button>
              </Collapsible.Trigger>
            </>
          )}
        </header>
        <Collapsible.Content>
          {action === "edit" ? (
            <ListEditForm
              listId={listId}
              title={title}
              onSuccess={() => {
                setOpen(false);
              }}
            />
          ) : null}
          {action === "delete" ? (
            <ListDeleteButton
              listId={listId}
              listName={title}
              onCancel={() => {
                setOpen(false);
                setAction(false);
              }}
            />
          ) : null}
        </Collapsible.Content>
      </Collapsible.Root>
    </li>
  );
}

export default ListRow;
