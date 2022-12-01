import { useGetVerifyCredentials } from "api/account";

import ListList from "containers/list/list-list";
import FollowingList from "containers/following/following-list";
import FollowingLoadAll from "containers/following/following-load-all";

import "./styles.css";

function ListsRoute() {
  const { data, isLoading } = useGetVerifyCredentials();

  if (isLoading) return "Loading ...";

  const {
    data: { id: accountId },
  } = data;

  return (
    <>
      <div className="lists-page | wrapper | cluster">
        <FollowingLoadAll accountId={accountId} showText={false} />
        <FollowingList accountId={accountId} />
        <ListList />
      </div>
    </>
  );
}

export default ListsRoute;
