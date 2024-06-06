import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiStrings } from '../services';

const useTicketsQuery = () => {
  const { data, isLoading, refetch } = useQuery({
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
  };
};

export default useTicketsQuery;
