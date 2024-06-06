import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiStrings } from '../services';

const useUserDetailQuery = (id: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      try {
        const response = await axios.get(apiStrings.users + '/' + id);

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

export default useUserDetailQuery;
