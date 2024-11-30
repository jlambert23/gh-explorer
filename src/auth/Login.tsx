import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export const Login = () => {
  const { isLoading, isAuthenticated, error, loginWithRedirect } = useAuth0();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/repos");
    }
  }, [isAuthenticated, setLocation]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    console.warn({ error });
  }

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Text fontSize="5xl">Welcome to GitHub Explorer 🐙</Text>
      <Text fontSize="2xl" marginBottom="12">
        Please login with your GitHub account to continue
      </Text>
      <Button
        colorPalette="blue"
        size="2xl"
        fontSize="xl"
        boxShadow="md"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        _active={{
          transform: "translateY(0)",
          boxShadow: "md",
        }}
        onClick={() => loginWithRedirect()}
      >
        Login with GitHub
      </Button>
    </Container>
  );
};
