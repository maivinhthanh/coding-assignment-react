// AssignUserModal.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useParams } from 'react-router-dom';
import {
  useTicketDetailQuery,
  useUsersQuery,
  useAssign,
} from 'client/src/hooks';
import AssignUserModal from './AssignUserModal';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('client/src/hooks');

describe('AssignUserModal', () => {
  const setOpen = jest.fn();

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useTicketDetailQuery as jest.Mock).mockReturnValue({
      data: { id: '1', assigneeId: '2' },
      refetch: jest.fn(),
    });
    (useUsersQuery as jest.Mock).mockReturnValue({
      data: [
        { id: '1', name: 'User One' },
        { id: '2', name: 'User Two' },
        { id: '3', name: 'User Three' },
        { id: '4', name: 'User Four' },
      ],
      isLoading: false,
      refetch: jest.fn(),
    });
    (useAssign as jest.Mock).mockReturnValue({
      assignUser: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly and shows users in Select', () => {
    render(<AssignUserModal open={true} setOpen={setOpen} />);

    expect(screen.getByText('Assignee')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('User Two')).toBeInTheDocument();
  });

  test('handles user selection and assignment', async () => {
    const assignUser = jest
      .fn()
      .mockImplementation((_, { onSuccess }) => onSuccess());
    (useAssign as jest.Mock).mockReturnValue({ assignUser });

    render(<AssignUserModal open={true} setOpen={setOpen} />);

    // Open the Select dropdown
    const select = screen.getByRole('combobox');
    userEvent.click(select);

    console.log(select)

    // Ensure options are rendered
    expect(screen.getByText('User One')).toBeInTheDocument();
    expect(screen.getByText('User Two')).toBeInTheDocument();

    // Select an option
    userEvent.click(screen.getByText('User One'));

    // Ensure the selected value is correct
    expect(select).toHaveValue('1');

    fireEvent.click(screen.getByText('OK'));

    await waitFor(() => {
      expect(assignUser).toHaveBeenCalledWith(
        { id: '1', userId: '3' },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        })
      );
      expect(setOpen).toHaveBeenCalledWith(false);
    });
  });

  test('handles cancellation', () => {
    render(<AssignUserModal open={true} setOpen={setOpen} />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
