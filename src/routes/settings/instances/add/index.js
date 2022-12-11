import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { useMastodonApp } from "lib/mastodon/provider";

import Spinner from "components/spinner";
import Message from "components/message";

import "./styles.css";

const { REACT_APP_VERSION } = process.env;

function getIsLoading({ code, authMutation, codeMutation }) {
  if (code != null) return true;
  if (authMutation.isLoading) return true;
  if (codeMutation.isLoading) return true;
  return false;
}

function Add() {
  const ref = React.useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { redirectToOauth, handleAuthCode, app = {} } = useMastodonApp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const code = searchParams.get("code");
  const navigate = useNavigate();

  const authMutation = useMutation({
    mutationFn: redirectToOauth,
  });

  const codeMutation = useMutation({
    mutationFn: handleAuthCode,
    onSuccess: () => navigate("/"),
  });

  const onSubmit = (data) => {
    const instanceName = data.instance
      .replace(/^https?:\/\//, "")
      .replace(/\/+$/, "")
      .toLowerCase();
    return authMutation.mutate({ instance: instanceName });
  };

  React.useEffect(() => {
    if (!code) return;
    if (ref.current) return;

    setSearchParams(new URLSearchParams(), {
      replace: true,
    });
    ref.current = true;
    codeMutation.mutate({
      code,
      clientId: app.clientId,
      clientSecret: app.clientSecret,
      instance: app.instance,
    });
  }, [setSearchParams, code, app, codeMutation]);

  const isLoading = getIsLoading({ code, authMutation, codeMutation });

  return (
    <div className="r-instances-add | stack border">
      <header className="r-instances-add-header">
        <h2 className="r-instances-add-title">Login</h2>
      </header>
      <form className="cluster" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper stack">
          <label htmlFor="instance-input">Instance name</label>
          <input
            type="text"
            id="instance-input"
            name="instance"
            inputMode="url"
            defaultValue=""
            placeholder="mastodon.social"
            autoCapitalize="none"
            spellCheck="true"
            {...register("instance", { required: true })}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          <span>{isLoading ? <Spinner /> : "Login"}</span>
        </button>
      </form>
      {errors.instance?.type === "required" ? (
        <Message data-type="danger" role="alert">
          <span>The instance is required</span>
        </Message>
      ) : null}
      {authMutation.isError ? (
        <Message data-type="danger" role="alert" className="stack">
          <div className="stack">
            <pre>Error: {authMutation.error.message}</pre>
            <p>Failed while triying to register the app.</p>
            <p>
              Is this a <strong>valid</strong> Mastodon instance?
            </p>
            <p>
              Is a browser extension <strong>blocking</strong> the request?
            </p>
            <p>
              Are you in <strong>private</strong> browsing mode?
            </p>
            <p>
              If you believe this is a problem with your instance, please
              contact the administrator of your instance.
            </p>
            <button type="button" onClick={authMutation.reset}>
              Dismiss
            </button>
          </div>
        </Message>
      ) : null}
      {codeMutation.isError ? (
        <Message data-type="danger" role="alert" className="stack">
          <div className="stack">
            <pre>Error: {codeMutation.error.message}</pre>
            <p>Failed while triying get the login code.</p>
            <p>Try refreshing the page</p>
            <button type="button" onClick={codeMutation.reset}>
              Dismiss
            </button>
          </div>
        </Message>
      ) : null}
      <footer>
        <span>V.{REACT_APP_VERSION}</span>
      </footer>
    </div>
  );
}

export default Add;
