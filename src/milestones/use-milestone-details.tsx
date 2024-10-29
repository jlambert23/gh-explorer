import { useUserRepos } from "../repos/use-user-repos";

export const useMilestoneDetails = (id: number) => {
  const repos = useUserRepos();
  return repos?.find((repo) => repo.id === id);
};
