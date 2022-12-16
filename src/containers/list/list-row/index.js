import PropTypes from "prop-types";
import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useDrop } from "react-dnd";

import { useGetListAccounts } from "api/lists";

import ListDeleteButton from "../list-delete-button";
import ListEditForm from "../list-edit-form";

import DisclosureButton from "./disclosure-button";
import Add from "./add";
import Remove from "./remove";
import ListAccountsList from "../list-accounts-list";
import ListAddSelectedButton from "../list-add-selected-button";
import ListRemoveSelectedButton from "../list-remove-selected-button";

import "./styles.css";

function ListRow({ title, id: listId, selectedItems }) {
  const { data } = useGetListAccounts({ listId });
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(null);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "following",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    []
  );

  const accounts = data?.accounts || [];

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
              <span className="c-list-row-label">
                <span className="redacted">{title}</span>
              </span>
              <Remove
                listId={listId}
                selectedItems={selectedItems}
                accounts={accounts}
              />
            </>
          ) : (
            <>
              <Collapsible.Trigger asChild>
                <DisclosureButton
                  data-action="edit"
                  onClick={() => {
                    setAction("edit");
                  }}
                >
                  <span className="icon" aria-label="edit list">
                    {open && action === "edit" ? "↓" : "⁝"}
                  </span>
                </DisclosureButton>
              </Collapsible.Trigger>
              <span className="c-list-row-label">
                <span className="redacted">{title}</span>
              </span>
              <Collapsible.Trigger asChild>
                <DisclosureButton
                  data-action="delete"
                  onClick={() => {
                    setAction("delete");
                  }}
                >
                  <span className="icon" aria-label="delete list">
                    {open && action === "delete" ? "↓" : "⌫"}
                  </span>
                </DisclosureButton>
              </Collapsible.Trigger>
            </>
          )}
        </header>
        <Collapsible.Content>
          {action === "edit" ? (
            <div className="c-list-row-edit-wrapper | stack">
              <ListEditForm
                listId={listId}
                title={title}
                onSuccess={() => {
                  setOpen(false);
                }}
              >
                {selectedItems.size > 0 ? (
                  <div className="cluster">
                    <ListAddSelectedButton
                      listId={listId}
                      accounts={accounts}
                      selectedItems={selectedItems}
                    />
                    <ListRemoveSelectedButton
                      listId={listId}
                      accounts={accounts}
                      selectedItems={selectedItems}
                    />
                  </div>
                ) : null}
              </ListEditForm>
              <ListAccountsList listId={listId} />
            </div>
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

ListRow.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  selectedItems: PropTypes.instanceOf(Set).isRequired,
};

export default ListRow;
