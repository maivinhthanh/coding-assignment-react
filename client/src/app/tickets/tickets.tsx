import { Ticket, User } from '@acme/shared-models';
import { Layout } from 'client/src/app/layout';
import { NavLink } from 'react-router-dom';
import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import {
  useCompleteTicket,
  useIncompleteTicket,
  useTicketsQuery,
  useUsersQuery,
} from 'client/src/hooks';

export interface TicketsProps {}

export function Tickets() {
  const { data: tickets, isLoading, refetch } = useTicketsQuery();
  const { data: users } = useUsersQuery();
  const { completeTicket } = useCompleteTicket();
  const { incompleteTicket } = useIncompleteTicket();

  const handleCompleteTicket = (id: number) => {
    completeTicket(
      { id },
      {
        onSuccess: () => {
          refetch();
        },
        onError: () => {},
      }
    );
  };

  const handleIncompleteTicket = (id: number) => {
    incompleteTicket(
      { id },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const columns: ColumnsType<Ticket> = useMemo(() => {
    return [
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        fixed: 'left' as const,
        render: (_, record) => (
          <NavLink to={`/${record.id}`}>
            <p>{record.description}</p>
          </NavLink>
        ),
      },
      {
        title: 'Assignee',
        dataIndex: 'assigneeId',
        key: 'assigneeId',
        render: (value) => {
          const user = users?.find((e: User) => e.id === value);
          return <p>{user?.name}</p>;
        },
      },
      {
        title: 'Completed',
        dataIndex: 'completed',
        key: 'completed',
        render: (value, record) => (
          <p>
            {value ? (
              <Tag
                color="green"
                onClick={() => handleIncompleteTicket(record.id)}
              >
                Completed
              </Tag>
            ) : (
              <Tag
                color="red"
                onClick={() => handleCompleteTicket(record.id)}
              >
                Pending
              </Tag>
            )}
          </p>
        ),
      },
    ];
  }, [users]);

  return (
    <Layout pageTitle={'Tickets'}>
      <Table
        columns={columns}
        dataSource={tickets}
        loading={isLoading}
        pagination={false}
      />
    </Layout>
  );
}

export default Tickets;
