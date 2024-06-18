import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { apiStrings } from '../services';

const useIncompleteTicket = () => {
  const { mutate: incompleteTicket, isPending } = useMutation<any, any, any>({
    mutationFn: async (variables) => {
      try {
        const response = await axios.delete(
          apiStrings.ticketDetail + variables.id + '/complete'
        );
        return response.data.data;
      } catch (error) {
        throw error;
      }
    },
    onError: async (err) => {},
  });

  return {
    incompleteTicket,
    isPending,
  };
};

export default useIncompleteTicket;
