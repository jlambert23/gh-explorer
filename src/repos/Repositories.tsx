import { Link as ChakraLink, Flex, Heading, List } from "@chakra-ui/react";
import { Link } from "wouter";
import { useUserRepos } from "./use-user-repos";
import { useUser } from "../user/use-user";

export const Repositories = () => {
  const user = useUser();
  const repos = useUserRepos();
  return (
    <>
      <Heading size="3xl" marginBlockEnd="1rem">
        {user?.name}'s Repositories
      </Heading>
      <List.Root>
        {repos?.map((repo) => (
          <List.Item key={repo.id}>
            <Flex inline gap="1">
              {repo.full_name}
              <span>
                [
                <ChakraLink asChild colorPalette="blue">
                  <Link to={`/repos/${repo.id}/milestones`}>milestones</Link>
                </ChakraLink>
                ]
              </span>
            </Flex>
          </List.Item>
        ))}
      </List.Root>
    </>
  );
};
