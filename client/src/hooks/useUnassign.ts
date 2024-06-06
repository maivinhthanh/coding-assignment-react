import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { apiStrings } from '../services';

const useUnassign = () => {
  const { mutate: unassignUser, isSuccess } = useMutation<any, any, any>({
    mutationFn: async (variables) => {
      try {
        const response = await axios.put(
          apiStrings.ticketDetail + variables.id + '/unassign'
        );
        return response.data.data;
      } catch (error) {
        throw error;
      }
    },
    onError: async (err) => {},
  });

  return {
    unassignUser,
    isSuccess,
  };
};

export default useUnassign;
