import {
  Link as ChakraLink,
  Container,
  For,
  Heading,
  List,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Link } from "wouter";
import { useRepoDetails } from "../repos/use-repo-details";
import { useMilestones } from "./use-milestones";

export const Milestones = ({ repoId }: { repoId: number }) => {
  const repo = useRepoDetails(repoId);
  const milestones = useMilestones(repoId);
  return (
    <Container>
      <Heading size="2xl">
        Milestones for&nbsp;
        <ChakraLink href={repo?.html_url} target="_blank" colorPalette="blue">
          {repo?.full_name}
        </ChakraLink>
      </Heading>
      {milestones == null ? (
        <Spinner />
      ) : milestones.length ? (
        <List.Root>
          <For each={milestones}>
            {(item) => (
              <List.Item key={item.number}>
                <ChakraLink asChild colorPalette="blue">
                  <Link to={`milestones/${item.number}`}>{item.title}</Link>
                </ChakraLink>
              </List.Item>
            )}
          </For>
        </List.Root>
      ) : (
        <Text>This repository has no active milestones.</Text>
      )}
    </Container>
  );
};
