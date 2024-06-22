import { Ticket, User } from '@acme/shared-models';
import { NavLink } from 'react-router-dom';
import { Spin, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTicketsQuery, useUsersQuery } from 'client/src/hooks';
import { useMemo } from 'react';

export interface TicketsProps {}

export function Tickets() {
  const { data: tickets, isLoading } = useTicketsQuery();
  const { data: users } = useUsersQuery();

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
        render: (value) => (
          <p>
            {value ? (
              <Tag color="green">Completed</Tag>
            ) : (
              <Tag color="red">Pending</Tag>
            )}
          </p>
        ),
      },
    ];
  }, [users]);

  return (
    <Table
      columns={columns}
      dataSource={tickets}
      loading={{ indicator: <Spin data-testid="loading-indicator" />, spinning: isLoading }}
      pagination={false}
      rowKey="id"
    />
  );
}

export default Tickets;
