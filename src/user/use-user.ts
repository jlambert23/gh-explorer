import { useOctokit } from "../OctoProvider";

export const useUser = () => {
  const { data } = useOctokit((octokit) =>
    octokit.rest.users.getAuthenticated()
  );
  return data?.data;
};
