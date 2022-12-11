import { useGetVerifyCredentials } from "api/account";

import FollowerTable from "containers/follower/follower-table";
import FollowerLoadAll from "containers/follower/follower-load-all";

import "./styles.css";

function Followers() {
  const { data, isLoading, isError, error } = useGetVerifyCredentials();

  if (isLoading) return null;
  if (isError) throw error;

  const {
    data: { id: accountId },
  } = data;

  return (
    <div className="followers-page | wrapper stack">
      <header className="cluster">
        <h1>Followers</h1>
        <FollowerLoadAll accountId={accountId} />
      </header>
      <FollowerTable accountId={accountId} />
    </div>
  );
}

export default Followers;
