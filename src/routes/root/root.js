import { useMastodonApp } from "lib/mastodon/provider";

import PrivateRoot from "./private";

function Root() {
  const { auth } = useMastodonApp();

  return (
    <>
      {auth ? <PrivateRoot /> : null}
      {!auth ? <span>No instance yet</span> : null}
    </>
  );
}

export default Root;
