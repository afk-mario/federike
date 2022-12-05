import React from "react";
import { useGetVerifyCredentials } from "api/account";

import ListList from "containers/list/list-list";
import ListCreateForm from "containers/list/list-create-form";
import FollowingList from "containers/following/following-list";
import FollowingLoadAll from "containers/following/following-load-all";
import FollowingActions from "containers/following/following-actions";
import FollowingDragLayer from "containers/following/following-drag-layer";
import { sortingOptions } from "containers/following/constants";

import Spinner from "components/spinner";

import "./styles.css";

function ListsRoute() {
  const { data, isLoading } = useGetVerifyCredentials();
  const [selectedItems, setSelectedItems] = React.useState(new Set());
  const [sort, setSort] = React.useState(sortingOptions[0].value);

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
    <>
      <div className="r-lists | wrapper | cluster">
        <FollowingDragLayer selectedItems={selectedItems} />
        <div className="list-following-wrapper | stack">
          <FollowingLoadAll accountId={accountId} showText={false} />
          <FollowingActions
            setSort={setSort}
            accountId={accountId}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
          <FollowingList
            sort={sort}
            accountId={accountId}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </div>
        <div className="list-wrapper | border stack">
          <ListCreateForm />
          <ListList selectedItems={selectedItems} />
        </div>
      </div>
    </>
  );
}

export default ListsRoute;
