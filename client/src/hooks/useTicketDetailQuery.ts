import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiStrings } from '../services';

const useTicketsQuery = (id: string | undefined) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['ticket', id],
    queryFn: async () => {
      try {
        const response = await axios.get(apiStrings.ticketDetail + id);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!id,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};

export default useTicketsQuery;
