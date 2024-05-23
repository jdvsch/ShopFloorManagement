import {useMutation} from '@tanstack/react-query'
import { axiosInstance } from '../config/api/api';

export default function useAskMutation({ 
    enabled = false,
    onError = () => {}, 
    onSuccess = () => {},
    onSettled = () => {}
}) {
  return useMutation({
    mutationFn: async ({url, method, data}) => {
      const info = await axiosInstance({
        url,
        method,
        data,
      }).catch(() => {
        throw new Error(['err', "Un error a ocurrido"]);
      });
      return info;
    },
    enabled,
    onError,
    onSuccess,
    onSettled
  });
}

// se llama asi:
// const mutation = useAskMutation({enabled: true, onError: function, onSuccess: function, onSettled: function})
// const mutation = useAskMutation({onError: function, onSuccess: function})
// mutation.mutate({url: POST, method: 'post', data: {}})