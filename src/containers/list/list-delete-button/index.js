import { useDeleteList, useInvalidateLists } from "api/lists";

function ListDeleteButton({ listId }) {
  const invalidate = useInvalidateLists();
  const mutation = useDeleteList({
    config: {
      onSuccess: () => {
        invalidate();
      },
    },
  });

  return (
    <button
      onClick={() => mutation.mutate({ listId })}
      disabled={mutation.isLoading}
    >
      <span className="icon">⌫</span>
    </button>
  );
}

export default ListDeleteButton;
