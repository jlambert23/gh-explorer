import { useOctokit } from "../OctoProvider";

export const useUserRepos = () => {
  const { data } = useOctokit(
    (octokit) =>
      octokit.rest.repos.listForAuthenticatedUser({
        per_page: 500,
      }),
    ["repos"]
  );
  return data?.data;
};
