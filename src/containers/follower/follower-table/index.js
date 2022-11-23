import React from "react";

import { useGetFollowers } from "api/followers";

import Table from "components/table";

import columns from "./columns";
import { getData } from "./helpers";

// acct: "rakujira@mastodon.gamedev.place"
// avatar: "https://assets.merveilles.town/cache/accounts/avatars/109/387/057/567/190/358/original/9c4923c652c62a29.png"
// avatar_static: "https://assets.merveilles.town/cache/accounts/avatars/109/387/057/567/190/358/original/9c4923c652c62a29.png"
// bot: false
// created_at: "2022-11-18T00:00:00.000Z"
// discoverable: true
// display_name: "james"
// emojis: Array []
// fields: Array(4) [ {…}, {…}, {…}, … ]
// followers_count: 57
// following_count: 44
// group: false
// header: "https://merveilles.town/headers/original/missing.png"
// header_static: "https://merveilles.town/headers/original/missing.png"
// id: "109387057567190358"
// last_status_at: null
// locked: false
// note: "<p>Making games / apps / tools / etc on the world wide web!</p><p>Currently in the early stages of building a 2D animation tool for a certain game console 👀</p>"
// statuses_count: 0
// url: "https://mastodon.gamedev.place/@rakujira"
// username: "rakujira"

function FollowerTable({ accountId }) {
  const { data, isLoading } = useGetFollowers({
    accountId,
    config: {
      enabled: accountId != null,
    },
  });

  const followers = React.useMemo(() => getData(data), [data]);

  if (isLoading) return "Loading ...";

  if (data.length === 0) {
    return (
      <div>
        <h3>No follower yet :(</h3>
      </div>
    );
  }

  return <Table data={followers} columns={columns} />;
}

export default FollowerTable;
