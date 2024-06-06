import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { apiStrings } from '../services';

const useAssign = () => {
  const { mutate: assignUser, isSuccess } = useMutation<any, any, any>({
    mutationFn: async (variables) => {
      try {
        const response = await axios.put(
          apiStrings.ticketDetail + variables.id + '/assign/' + variables.userId
        );
        return response.data.data;
      } catch (error) {
        throw error;
      }
    },
    onError: async (err) => {},
  });

  return {
    assignUser,
    isSuccess,
  };
};

export default useAssign;
