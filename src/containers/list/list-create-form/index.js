import { useForm } from "react-hook-form";

import { useCreateList, useInvalidateLists } from "api/lists";

import "./styles.css";

function ListFormCreate() {
  const { register, handleSubmit, reset } = useForm();
  const invalidate = useInvalidateLists();
  const mutation = useCreateList({
    config: {
      onSuccess: () => {
        invalidate();
        reset();
      },
    },
  });

  const onSubmit = ({ title }) => {
    mutation.mutate({ title });
  };
  return (
    <form
      className="c-list-form-create | cluster"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        name="title"
        type="text"
        defaultValue=""
        placeholder="List title"
        {...register("title")}
      />
      <button type="submit" disabled={mutation.isLoading}>
        create
      </button>
    </form>
  );
}

export default ListFormCreate;
