import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiStrings } from '../services';
import { Ticket } from '@acme/shared-models';

const useTicketsQuery = () => {
  const { data, isLoading, refetch, error } = useQuery<any, any, Ticket[]>({
    queryKey: ['tickets'],
    queryFn: async () => {
      try {
        const response = await axios.get(apiStrings.tickets);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });

  return {
    data,
    isLoading,
    refetch,
    error,
  };
};

export default useTicketsQuery;
