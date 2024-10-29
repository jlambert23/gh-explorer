import { useOctokit } from "../OctoProvider";

export const useMilestoneIssues = (milestoneId: string) => {
  const { data } = useOctokit(
    (octokit) =>
      octokit.rest.issues.listForRepo({
        owner: "synapsestudios",
        repo: "bad-dragon-shop",
        milestone: milestoneId,
      }),
    ["milestone", milestoneId]
  );
  return data?.data;
};
