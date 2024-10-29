import { useUserRepos } from "./use-user-repos";

export const useRepoDetails = (id: number) => {
  const repos = useUserRepos();
  return repos?.find((repo) => repo.id === id);
};
