import { User } from '@acme/shared-models';
import { Modal, Select } from 'antd';
import {
  useAssign,
  useTicketDetailQuery,
  useUsersQuery,
} from 'client/src/hooks';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './assignUserModal.module.css';

export interface TicketsProps {}
export interface OptionType {
  label: string;
  value: string;
}

export interface AssignUserModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function AssignUserModal({ open, setOpen }: AssignUserModalProps) {
  console.log('AssignUserModal');
  const { id } = useParams();
  const { data: ticket, refetch } = useTicketDetailQuery(id);
  const { data: users } = useUsersQuery();

  const userOptions = useMemo(
    () =>
      users?.map(
        (e: User) => ({ label: e.name, value: e.id } as unknown as OptionType)
      ),
    [users]
  );
  const [selectedUser, setSelectedUser] = useState<number | null>(
    ticket?.assigneeId
  );
  const { assignUser } = useAssign();

  const handleAssign = () => {
    assignUser(
      { id, userId: selectedUser },
      {
        onSuccess: () => {
          refetch();
          setSelectedUser(null);
          setOpen(false);
        },
        onError: () => {
          setOpen(false);
        },
      }
    );
  };

  useEffect(() => {
    setSelectedUser(ticket?.assigneeId);
  }, [ticket]);

  return (
    <Modal
      title="Assignee"
      open={open}
      onOk={handleAssign}
      onCancel={() => {
        setOpen(false);
        setSelectedUser(null);
      }}
      destroyOnClose
    >
      <Select
        options={userOptions}
        value={selectedUser}
        onChange={(value) => {
          setSelectedUser(value);
        }}
        className={styles['select']}
      />
    </Modal>
  );
}

export default AssignUserModal;
