import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Tickets from './tickets';
import { useTicketsQuery, useUsersQuery } from 'client/src/hooks';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the router component

// Mock the axios instance
jest.mock('client/src/hooks/useTicketsQuery');
jest.mock('client/src/hooks/useUsersQuery');

// Import the mocked hooks
const mockUseTicketsQuery = useTicketsQuery as jest.Mock;
const mockUseUsersQuery = useUsersQuery as jest.Mock;

// Mock data
const mockTickets = [
  {
    id: 1,
    description: 'Install a monitor arm',
    assigneeId: 1,
    completed: false,
  },
  {
    id: 2,
    description: 'Move the desk to the new location',
    assigneeId: 4,
    completed: true,
  },
];

const mockUsers = [
  {
    id: 1,
    name: 'Alice',
  },
  {
    id: 2,
    name: 'Bob',
  },
  {
    id: 3,
    name: 'Chris',
  },
  {
    id: 4,
    name: 'Daisy',
  },
  {
    id: 5,
    name: 'Ed',
  },
];
const queryClient = new QueryClient();

describe('Tickets Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUseTicketsQuery.mockReset();
    mockUseUsersQuery.mockReset();
  });

  test('renders a loading state',async () => {
    // Mock loading state
    mockUseTicketsQuery.mockReturnValue({
      data: null,
      isLoading: true,
      refetch: jest.fn(),
    });
    mockUseUsersQuery.mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Tickets />
        </Router>
      </QueryClientProvider>
    );

    // Check for loading state  
    const loadingIndicator = screen.getByTestId('loading-indicator'); // Ant Design Spin component uses role="alert"
    expect(loadingIndicator).toBeInTheDocument();

    // Wait for loading to complete and data to be displayed
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(mockTickets.length); // 2 data rows + 1 header row
    });
  });

  test('renders tickets table with data', () => {
    // Mock data state
    mockUseTicketsQuery.mockReturnValue({
      data: mockTickets,
      isLoading: false,
      refetch: jest.fn(),
    });
    mockUseUsersQuery.mockReturnValue({
      data: mockUsers,
      isLoading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Tickets />
        </Router>
      </QueryClientProvider>
    );

    // Check that the table rows are rendered correctly
    expect(screen.getByText('Install a monitor arm')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();

    expect(screen.getByText('Move the desk to the new location')).toBeInTheDocument();
    expect(screen.getByText('Daisy')).toBeInTheDocument();
  });
});
