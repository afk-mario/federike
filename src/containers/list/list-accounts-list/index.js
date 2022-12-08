import PropTypes from "prop-types";

import { useGetListAccounts } from "api/lists";

import ListAccountsListRow from "./row";

import "./styles.css";

function ListAccountsList({ listId }) {
  const query = useGetListAccounts({ listId });

  if (query.isLoading) return null;

  const { accounts } = query.data;

  return (
    <ul className="c-list-accounts-list | stack">
      {accounts
        .filter((item) => item.acct != null)
        .map((item) => {
          return (
            <ListAccountsListRow key={item.id} listId={listId} {...item} />
          );
        })}
    </ul>
  );
}

ListAccountsList.propTypes = {
  listId: PropTypes.string.isRequired,
};

export default ListAccountsList;
