import React from "react";
import { useGetVerifyCredentials } from "api/account";

import { FollowingProvider } from "containers/following/following-list/context";

import ListList from "containers/list/list-list";
import ListCreateForm from "containers/list/list-create-form";
import FollowingList from "containers/following/following-list";
import FollowingLoadAll from "containers/following/following-load-all";
import FollowingActions from "containers/following/following-actions";
import FollowingDragLayer from "containers/following/following-drag-layer";

import Spinner from "components/spinner";

import "./styles.css";
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
      <div className="r-lists | wrapper | cluster">
        <FollowingDragLayer />
        <div className="list-following-wrapper | stack">
          <FollowingLoadAll accountId={accountId} showText={false} />
          <FollowingProvider>
            <FollowingActions accountId={accountId} />
            <FollowingList accountId={accountId} />
          </FollowingProvider>
        </div>
        <div className="list-wrapper | border stack">
          <ListCreateForm />
          <ListList />
        </div>
      </div>
    </ListRouteProvider>
  );
}

export default ListsRoute;
