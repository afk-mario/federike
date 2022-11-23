import { useGetVerifyCredentials } from "api/account";

function PrivateRoot() {
  const { data, isLoading } = useGetVerifyCredentials();

  if (isLoading) return "Loading ...";

  const {
    data: { followers_count: followersCount, following_count: followingCount },
  } = data;

  return (
    <div className="stack | wrapper">
      <pre>
        following: {followingCount} | followers: {followersCount}
      </pre>
    </div>
  );
}

export default PrivateRoot;
