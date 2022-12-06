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
          ></div>
          <HoverCard.Arrow className="c-following-row-avatar-arrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

export default FollowingAvatar;
