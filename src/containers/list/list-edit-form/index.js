import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import { useUpdateList, useInvalidateLists } from "api/lists";

import "./styles.css";

function ListEditForm({ listId, title, onSuccess }) {
  const { register, handleSubmit } = useForm();
  const invalidate = useInvalidateLists();
  const mutation = useUpdateList({
    config: {
      onSuccess: () => {
        invalidate();
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
