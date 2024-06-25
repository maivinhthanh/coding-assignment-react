import { Ticket, User } from '@acme/shared-models';
import { Button, Card, Modal, Select, Skeleton, Tag } from 'antd';
import { Layout } from 'client/src/app/layout';
import {
  useAssign,
  useCompleteTicket,
  useIncompleteTicket,
  useTicketDetailQuery,
  useUnassign,
  useUsersQuery,
} from 'client/src/hooks';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AssignUserModal from '../ticketModal/assignUserModal';

export interface TicketsProps {}
export interface OptionType {
  label: string;
  value: string;
}

export function TicketDetail() {
  console.log('TicketDetail');

  const { id } = useParams();
  const { data: ticket, isLoading, refetch } = useTicketDetailQuery(id);
  const { data: users } = useUsersQuery();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { unassignUser } = useUnassign();
  const { completeTicket } = useCompleteTicket();
  const { incompleteTicket } = useIncompleteTicket();

  const breadCrumb = [
    {
      title: (
        <div>
          <Link to={'/'}>Ticket</Link>
        </div>
      ),
    },
    {
      title: <p>{id}</p>,
    },
  ];

  const assignee = useMemo(() => {
    return users?.find((e: User) => e.id === ticket?.assigneeId);
  }, [users, ticket]);

  const handleUnassign = () => {
    setLoading(true);
    unassignUser(
      { id },
      {
        onSuccess: () => {
          refetch();
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      }
    );
  };

  const handleCompleteTicket = () => {
    setLoading(true);
    completeTicket(
      { id },
      {
        onSuccess: () => {
          refetch();
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      }
    );
  };

  const handleIncompleteTicket = () => {
    setLoading(true);
    incompleteTicket(
      { id },
      {
        onSuccess: () => {
          refetch();
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <Layout pageTitle={'Ticket Detail'} breadCrumb={breadCrumb}>
      <Card
        title={ticket?.description}
        extra={
          <>
            {ticket?.assigneeId ? (
              <Button onClick={handleUnassign} loading={loading}>
                Unassign
              </Button>
            ) : (
              <Button onClick={() => setOpen(true)}>Assign</Button>
            )}
          </>
        }
      >
        {isLoading ? (
          <Skeleton active />
        ) : (
          <>
            <p>{assignee?.name}</p>
            <p>
              Status:{' '}
              {ticket?.completed ? (
                <Tag color="green" onClick={handleIncompleteTicket}>
                  Completed
                </Tag>
              ) : (
                <Tag color="red" onClick={handleCompleteTicket}>
                  Pending
                </Tag>
              )}
            </p>
          </>
        )}
      </Card>
      <AssignUserModal open={open} setOpen={setOpen} />
    </Layout>
  );
}

export default TicketDetail;
