import {
  Box,
  Button,
  Link as ChakraLink,
  Code,
  Float,
  For,
  Heading,
  List,
  Stack,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMilestoneIssues } from "./use-milestone-issues";
import { useMilestones } from "./use-milestones";

export const MilestoneDetails = ({
  repoId,
  milestoneId,
}: {
  repoId: number;
  milestoneId: string;
}) => {
  const milestones = useMilestones(repoId);
  const issues = useMilestoneIssues(milestoneId);
  const [copied, setCopied] = useState(false);

  const copyValue = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const milestone = milestones?.find(
    ({ number }) => `${number}` === milestoneId
  );

  const markdown =
    issues?.map((issue) => `- [ ] #${issue.number}`).join("\n") ?? "";

  return (
    <Stack padding="1rem">
      <Heading size="2xl">
        <ChakraLink
          href={milestone?.html_url}
          target="_blank"
          colorPalette="blue"
        >
          {milestone?.title}
        </ChakraLink>
      </Heading>
      <Tabs.Root defaultValue="list" colorPalette="gray">
        <Tabs.List>
          <Tabs.Trigger value="list">
            <Heading>List</Heading>
          </Tabs.Trigger>
          <Tabs.Trigger value="markdown">
            <Heading>Markdown</Heading>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="list">
          <List.Root>
            <For each={issues}>
              {(item) => (
                <List.Item key={item.number}>
                  <ChakraLink
                    href={item.html_url}
                    target="_blank"
                    colorPalette="blue"
                  >
                    {item.title} (#{item.number})
                  </ChakraLink>
                </List.Item>
              )}
            </For>
          </List.Root>
        </Tabs.Content>
        <Tabs.Content value="markdown">
          <Box
            bg="gray.900"
            width="fit-content"
            padding="1rem"
            paddingBlockEnd="1.5rem"
          >
            <Box
              position="relative"
              width="fit-content"
              paddingBlockStart="0.25rem"
            >
              <Float placement="top-end">
                <Button
                  variant="plain"
                  colorPalette="gray"
                  onClick={() => copyValue(markdown)}
                >
                  {copied ? "✅" : "📋"}
                </Button>
              </Float>
              <Code whiteSpace="pre">{markdown}</Code>
            </Box>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Stack>
  );
};
