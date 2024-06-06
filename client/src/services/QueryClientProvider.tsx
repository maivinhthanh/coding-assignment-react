import {
  QueryClient,
  QueryClientProvider as Provider,
} from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;
