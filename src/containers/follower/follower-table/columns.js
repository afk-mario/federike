import Time from "components/time";

const columns = [
  {
    header: "Bot",
    accessorKey: "bot",
  },
  {
    header: "Username",
    accessorKey: "username",
    cell: (props) => {
      const { url } = props.row.original;
      return (
        <a href={url} rel="noreferrer noopener" target="_blank">
          {props.getValue()}
        </a>
      );
    },
  },
  {
    header: "Display Name",
    accessorKey: "display_name",
  },
  {
    header: "Instance",
    accessorFn: (row) => {
      const instance = row.acct.split("@")[1];
      return instance || "--";
    },
  },
  {
    header: "Followers",
    accessorKey: "followers_count",
    cell: (props) => parseInt(props.getValue(), 10).toLocaleString("en-US"),
  },
  {
    header: "Following",
    accessorKey: "following_count",
    cell: (props) => parseInt(props.getValue(), 10).toLocaleString("en-US"),
  },
  {
    header: "Status Count",
    accessorKey: "statuses_count",
    cell: (props) => parseInt(props.getValue(), 10).toLocaleString("en-US"),
  },
  {
    header: "Last Status",
    accessorKey: "last_status_at",
    cell: (props) => {
      const value = props.getValue();
      if (!value) return <span>--</span>;

      const date = new Date(value);
      return <Time>{date.toISOString()}</Time>;
    },
  },
  {
    header: "Created At",
    accessorKey: "created_at",
    cell: (props) => <Time>{props.getValue()}</Time>,
  },
];

export default columns;
