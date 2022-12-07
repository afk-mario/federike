import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { useUpdateList, useInvalidateListUpdate } from "api/lists";

import "./styles.css";

function ListEditForm({ listId, title, onSuccess }) {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const invalidate = useInvalidateListUpdate();
  const mutation = useUpdateList({
    config: {
      onMutate: async (variables) => {
        await queryClient.cancelQueries({
          queryKey: ["lists"],
        });

        await queryClient.cancelQueries({
          queryKey: ["list", variables.listId],
        });

        const prevList = queryClient.getQueryData(["list", variables.listId]);

        const prevLists = queryClient.getQueryData(["lists"]);

        queryClient.setQueryData(["list", variables.listId], (old) => ({
          ...old,
          title,
        }));

        queryClient.setQueryData(["lists"], (old) =>
          old.map((item) => {
            if (item.id === variables.listId) {
              return {
                ...item,
                title,
              };
            }
            return {
              ...item,
            };
          })
        );
        return { prevLists, prevList };
      },
      onSettled: (res, context, variables) => {
        invalidate({ listId: variables.listId });
        onSuccess();
      },
    },
  });

  const onSubmit = (variables) => {
    mutation.mutate({ listId, title: variables.title });
  };

  return (
    <form
      className="c-list-edit-form | cluster"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        name="title"
        type="text"
        defaultValue={title}
        placeholder="List title"
        {...register("title")}
      />
      <button type="submit" disabled={mutation.isLoading}>
        edit
      </button>
    </form>
  );
}

ListEditForm.propTypes = {
  listId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
};

ListEditForm.defaultProps = {
  onSuccess: () => {},
};

export default ListEditForm;
