/* eslint-disable react/no-danger */
import PropTypes from "prop-types";
import * as HoverCard from "@radix-ui/react-hover-card";

import "./styles.css";

function FollowingAvatar({ avatar, username, note }) {
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
};

FollowingAvatar.defaultProps = {
  avatar: null,
  note: null,
};

export default FollowingAvatar;
