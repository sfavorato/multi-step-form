import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserInfoForm } from "./pages/UserInfoForm";

const queryClient = new QueryClient({});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserInfoForm />
    </QueryClientProvider>
  );
};
