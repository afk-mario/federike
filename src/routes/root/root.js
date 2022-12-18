import { useMastodonApp } from "lib/mastodon";

import Public from "./public";
import Lists from "../lists";

import "./styles.css";

function Root() {
  const { auth, isLoading } = useMastodonApp();

  if (isLoading) return null;

  return (
    <>
      {auth ? <Lists /> : null}
      {!auth ? <Public /> : null}
    </>
  );
}

export default Root;
