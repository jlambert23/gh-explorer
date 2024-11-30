import { useAuth0 } from "@auth0/auth0-react";
import { Button, Flex, Text } from "@chakra-ui/react";

export const Header = () => {
  const { logout, user } = useAuth0();
  return (
    <Flex
      justify="space-between"
      align="center"
      backgroundColor="gray.900"
      padding="4"
      marginBottom="6"
      borderRadius="md"
    >
      <Text fontSize="xl">Hello {user?.name}!</Text>
      <Button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        colorPalette="red"
        variant="surface"
        size="sm"
        boxShadow="sm"
        _hover={{
          transform: "translateY(-1px)",
          boxShadow: "md",
        }}
      >
        Log out
      </Button>
    </Flex>
  );
};
