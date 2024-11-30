import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { OctoProvider } from "./OctoProvider";

const queryClient = new QueryClient();

const chakraConfig = defineConfig({
  ...defaultConfig,
  globalCss: {
    body: {
      bg: "gray.800",
    },
  },
});
const chakraSystem = createSystem(chakraConfig);

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OctoProvider>
          <ChakraProvider value={chakraSystem}>{children}</ChakraProvider>
        </OctoProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
