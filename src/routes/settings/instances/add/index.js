import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useMastodonApp } from "lib/mastodon/provider";

function Add() {
  const [searchParams] = useSearchParams();
  const { redirectToOauth, handleAuthCode, app, auth, clear } =
    useMastodonApp();
  const { register, handleSubmit } = useForm();
  const code = searchParams.get("code");
  const { clientId, clientSecret, instance } = app || {};
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () =>
      handleAuthCode({ code, clientId, clientSecret, instance }),
    onSuccess: () => navigate("/"),
  });

  const onSubmit = (data) => {
    const instanceName = data.instance
      .replace(/^https?:\/\//, "")
      .replace(/\/+$/, "")
      .toLowerCase();
    redirectToOauth({ instance: instanceName });
  };

  return (
    <div className="stack">
      {app || auth ? (
        <>
          <pre>{JSON.stringify({ app, auth }, null, 2)} </pre>
          <button onClick={clear}>Clear</button>
        </>
      ) : null}
      {code ? (
        <>
          <span>code: {code}</span>{" "}
          <button onClick={mutation.mutate}>Set Auth</button>
        </>
      ) : null}
      <form className="stack" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="instance">Instance</label>
        <input
          name="instance"
          type="text"
          defaultValue="merveilles.town"
          {...register("instance")}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Add;
