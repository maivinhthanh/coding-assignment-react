import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { apiStrings } from '../services';

const useCompleteTicket = () => {
  const { mutate: completeTicket, isSuccess } = useMutation<any, any, any>({
    mutationFn: async (variables) => {
      try {
        const response = await axios.put(
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
    completeTicket,
    isSuccess,
  };
};

export default useCompleteTicket;
