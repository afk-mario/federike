import { useGetVerifyCredentials } from "api/account";

import FollowingTable from "containers/following/following-table";
import FollowingLoadAll from "containers/following/following-load-all";

import "./styles.css";

function FollowingRoute() {
  const { data, isLoading, isError, error } = useGetVerifyCredentials();

  if (isLoading) return null;
  if (isError) throw error;

  const {
    data: { id: accountId },
  } = data;

  return (
    <div className="following-page | wrapper stack">
      <header className="cluster">
        <h1>Following</h1>
        <FollowingLoadAll accountId={accountId} />
      </header>
      <FollowingTable accountId={accountId} />
    </div>
  );
}

export default FollowingRoute;
