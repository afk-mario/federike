import { useGetFollowingLists } from "api/lists";

import Tag from "components/tag";

import "./styles.css";

function FollowingCard({
  id,
  bot,
  username,
  display_name: displayName,
  acct,
  avatar,
  note,
  ...rest
}) {
  const { data } = useGetFollowingLists({ accountId: id });
  const lists = data?.data || [];

  return (
    <article className="c-following-card | cluster">
      <div className="c-following-card-avatar-wrapper">
        <img
          className="c-following-card-avatar"
          src={avatar}
          alt={`${username} avatar`}
        />
      </div>
      <div className="c-following-card-content | stack">
        <header className="c-following-card-header | stack">
          <span className="c-following-card-title">{username}</span>
          <span className="c-following-card-subtitle">{acct}</span>
          {lists.length > 0 ? (
            <ul className="c-following-card-tag-list | cluster">
              {lists.map((item) => (
                <li key={item.id}>
                  <Tag>{item.title}</Tag>
                </li>
              ))}
            </ul>
          ) : null}
        </header>
        <div
          className="c-following-card-note"
          dangerouslySetInnerHTML={{ __html: note }}
        ></div>
      </div>
    </article>
  );
}

export default FollowingCard;
