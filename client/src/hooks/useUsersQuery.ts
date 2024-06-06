import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiStrings } from '../services';

const useUsersQuery = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await axios.get(apiStrings.users);

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

export default useUsersQuery;
