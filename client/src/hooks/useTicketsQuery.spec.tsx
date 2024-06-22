// useTicketsQuery.test.tsx
import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import useTicketsQuery from './useTicketsQuery';
import { apiStrings } from '../services';
import { Ticket } from '@acme/shared-models';
import { ReactNode } from 'react';
import { waitFor } from '@testing-library/react';

const mockAxios = new MockAdapter(axios);
const queryClient = new QueryClient();
interface WrapperProps {
  children: ReactNode;
}

const wrapper: React.FC<WrapperProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useTicketsQuery', () => {
  afterEach(() => {
    mockAxios.reset();
    queryClient.clear();
  });

  test('should return loading state initially', async () => {
    mockAxios.onGet(apiStrings.tickets).reply(200, []);

    const { result, waitForNextUpdate } = renderHook(() => useTicketsQuery(), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
  });

  test('should return data after fetching', async () => {
    const tickets: Ticket[] = [
      {
        id: 1,
        description: 'Install a monitor arm',
        assigneeId: 1,
        completed: false,
      },
      {
        id: 2,
        description: 'Move the desk to the new location',
        assigneeId: 1,
        completed: false,
      },
    ];
    mockAxios.onGet(apiStrings.tickets).reply(200, tickets);

    const { result } = renderHook(() => useTicketsQuery(), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.data).toEqual(tickets);
      expect(result.current.isLoading).toBe(false);
    });
  });

  test('should handle error state', async () => {
    mockAxios.onGet(apiStrings.tickets).reply(1000);

    const { result } = renderHook(() => useTicketsQuery(), {
      wrapper,
    });

    await waitFor(() => {
      console.log(result.current);
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
      expect(result.current.error).toBeDefined();
    });
  });
});
