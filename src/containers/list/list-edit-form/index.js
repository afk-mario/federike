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
      onMutate: async ({ listId, title }) => {
        await queryClient.cancelQueries({
          queryKey: ["lists"],
        });

        await queryClient.cancelQueries({
          queryKey: ["list", listId],
        });

        const prevList = queryClient.getQueryData(["list", listId]);

        const prevLists = queryClient.getQueryData(["lists"]);

        queryClient.setQueryData(["list", listId], (old) => ({
          ...old,
          title,
        }));

        queryClient.setQueryData(["lists"], (old) =>
          old.map((item) => {
            if (item.id === listId) {
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
        const { listId } = variables;
        invalidate({ listId });
        onSuccess();
      },
    },
  });

  const onSubmit = ({ title }) => {
    mutation.mutate({ listId, title });
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
  onSuccess: PropTypes.func,
};

ListEditForm.defaultProps = {
  onSuccess: () => {},
};

export default ListEditForm;
