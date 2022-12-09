import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";

import { useDeleteList, useInvalidateLists } from "api/lists";

import "./styles.css";

function ListDeleteButton({ listId, listName, onCancel }) {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateLists();
  const mutation = useDeleteList({
    config: {
      onMutate: async (variables) => {
        await queryClient.cancelQueries({
          queryKey: ["lists"],
        });
        const prevLists = queryClient.getQueryData(["lists"]);
        queryClient.setQueryData(["lists"], (old) =>
          old.filter(({ id }) => id !== variables.listId)
        );
        return prevLists;
      },
      onSettled: () => {
        invalidate();
      },
    },
  });

  return (
    <div className="c-list-delete-button | stack">
      <div>
        <p>
          Are you sure you want to delete the{" "}
          <strong className="redacted">{listName}</strong> list?
        </p>
        <p>
          This <strong>can not</strong> be undone
        </p>
      </div>
      <footer className="cluster">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button
          type="button"
          onClick={() => mutation.mutate({ listId })}
          disabled={mutation.isLoading}
        >
          Confirm
        </button>
      </footer>
    </div>
  );
}

ListDeleteButton.propTypes = {
  listId: PropTypes.string.isRequired,
  listName: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
};

ListDeleteButton.defaultProps = {
  onCancel: () => {},
};

export default ListDeleteButton;
