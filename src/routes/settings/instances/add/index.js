import React from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { useMastodonApp } from "lib/mastodon/provider";
import Spinner from "components/spinner";

import "./styles.css";

function Add() {
  const [isLoading, setIsLoading] = React.useState(false);
  const ref = React.useRef(false);
  const [searchParams] = useSearchParams();
  const { redirectToOauth, handleAuthCode, app } = useMastodonApp();
  const { register, handleSubmit } = useForm();
  const code = searchParams.get("code");
  const { clientId, clientSecret, instance } = app || {};
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: handleAuthCode,
    onSuccess: () => navigate("/"),
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    const instanceName = data.instance
      .replace(/^https?:\/\//, "")
      .replace(/\/+$/, "")
      .toLowerCase();
    redirectToOauth({ instance: instanceName });
  };

  React.useEffect(() => {
    if (!code) return;
    if (ref.current) return;
    ref.current = true;
    mutation.mutate({ code, clientId, clientSecret, instance });
  }, [code, clientId, clientSecret, instance, mutation]);

  return (
    <div className="r-instances-add | stack border">
      <header className="r-instances-add-header">
        <h2 className="r-instances-add-title">Login</h2>
      </header>
      <form className="cluster" onSubmit={handleSubmit(onSubmit)}>
        <input
          name="instance"
          type="text"
          defaultValue="merveilles.town"
          {...register("instance")}
        />
        <button type="submit" disabled={isLoading || code != null}>
          {isLoading || code != null ? <Spinner /> : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Add;
