import { useOctokit } from "../OctoProvider";
import { useMilestoneDetails } from "./use-milestone-details";

export const useMilestones = (repoId: number) => {
  const repo = useMilestoneDetails(repoId);
  const { data, isLoading } = useOctokit(
    (octokit) =>
      octokit.rest.issues.listMilestones({
        owner: repo?.owner.login ?? "",
        repo: repo?.name ?? "",
      }),
    [`${repoId}`, "milestones"],
    { enabled: !!repo }
  );
  return isLoading ? null : data?.data ?? [];
};
