import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { useUpdateList, useInvalidateListUpdate } from "api/lists";

import "./styles.css";

function ListEditForm({ listId, title, onSuccess, children }) {
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
      className="c-list-edit-form | stack"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        name="title"
        type="text"
        defaultValue={title}
        placeholder="List title"
        {...register("title")}
      />
      <footer className="c-list-edit-form-footer | cluster">
        {children}
        <button type="submit" disabled={mutation.isLoading}>
          edit
        </button>
      </footer>
    </form>
  );
}

ListEditForm.propTypes = {
  listId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  children: PropTypes.node,
};

ListEditForm.defaultProps = {
  onSuccess: () => {},
  children: null,
};

export default ListEditForm;
