import React from "react";
import { useGetVerifyCredentials } from "api/account";

import { FollowingProvider } from "containers/following/following-list/context";

import ListList from "containers/list/list-list";
import ListCreateForm from "containers/list/list-create-form";
import FollowingList from "containers/following/following-list";
import FollowingActions from "containers/following/following-actions";
import FollowingDragLayer from "containers/following/following-drag-layer";

import Spinner from "components/spinner";

import "./styles.css";
import AccountUnfollowRow from "containers/account/account-unfollow-row";
import { ListRouteProvider } from "./context";

function ListsRoute() {
  const { data, isLoading } = useGetVerifyCredentials();

  if (isLoading)
    return (
      <div className="r-lists-loading | border">
        <Spinner />
      </div>
    );

  const {
    data: { id: accountId },
  } = data;

  return (
    <ListRouteProvider>
      <FollowingDragLayer />
      <main className="r-lists | wrapper">
        <div className="list-following-wrapper | stack">
          <FollowingProvider>
            <FollowingActions accountId={accountId} />
            <FollowingList accountId={accountId} />
          </FollowingProvider>
        </div>
        <div className="list-wrapper | border stack">
          <header className="r-lists-list-header">
            <h2>Lists</h2>
          </header>
          <ListCreateForm />
          <AccountUnfollowRow />
          <ListList />
        </div>
      </main>
    </ListRouteProvider>
  );
}

export default ListsRoute;
