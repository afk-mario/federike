/* eslint-disable react/no-danger */
import PropTypes from "prop-types";
import * as HoverCard from "@radix-ui/react-hover-card";

import Time from "components/time";

import "./styles.css";

function FollowingAvatar({
  avatar,
  username,
  note,
  statusesCount,
  lastStatusAt,
}) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="c-following-row-avatar-wrapper">
          <img
            className="c-following-row-avatar"
            src={avatar}
            alt={`${username} avatar`}
          />
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="c-following-row-avatar-note | border"
          sideOffset={8}
          align="start"
        >
          <div
            className="c-following-row-avatar-note-content"
            dangerouslySetInnerHTML={{ __html: note }}
          />

          <footer className="c-following-row-avatar-note-footer">
            <span>
              {statusesCount === 0 ? "no" : statusesCount} toots
              {statusesCount === 0 ? " yet" : null}
            </span>

            {lastStatusAt ? (
              <span>
                {", "}
                last one on <Time>{lastStatusAt}</Time>
              </span>
            ) : null}
          </footer>
          <HoverCard.Arrow className="c-following-row-avatar-arrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

FollowingAvatar.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  note: PropTypes.string,
  statusesCount: PropTypes.number.isRequired,
  lastStatusAt: PropTypes.string,
};

FollowingAvatar.defaultProps = {
  avatar: null,
  note: null,
  lastStatusAt: null,
};

export default FollowingAvatar;
