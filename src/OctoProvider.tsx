import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Octokit } from "octokit";
import { createContext, ReactNode, useContext } from "react";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const OctoContext = createContext(new Octokit());

export const OctoProvider = ({ children }: { children: ReactNode }) => {
  return (
    <OctoContext.Provider value={octokit}>{children}</OctoContext.Provider>
  );
};

export const useOctokit = <T,>(
  query: (octokit: Octokit) => Promise<T>,
  queryKey: string[] = [],
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) => {
  const octokit = useContext(OctoContext);
  return useQuery({
    ...options,
    queryKey: ["octokit", ...queryKey],
    enabled: !!octokit && (options?.enabled ?? true),
    queryFn: () => query(octokit!),
  });
};
