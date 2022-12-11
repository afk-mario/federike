import { useForm } from "react-hook-form";

import { useCreateList, useInvalidateLists } from "api/lists";

import Message from "components/message";

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
    <div className="stack">
      <form
        className="c-list-form-create | cluster"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          name="title"
          type="text"
          defaultValue=""
          placeholder="List title"
          required
          {...register("title")}
        />
        <button type="submit" disabled={mutation.isLoading}>
          create
        </button>
      </form>
      {mutation.isError ? (
        <Message data-type="danger" role="alert" className="stack">
          <div className="stack">
            <pre>Error: {mutation.error.message}</pre>
            {mutation.error.response?.data?.error ? (
              <p>{mutation.error.response?.data?.error}</p>
            ) : (
              <p>Failed while triying to creat the list.</p>
            )}
            <button type="button" onClick={mutation.reset}>
              Dismiss
            </button>
          </div>
        </Message>
      ) : null}
    </div>
  );
}

export default ListFormCreate;
