import {useMutation} from '@tanstack/react-query'
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9010/api/",
  });

const emptyFunction = () => {}

export default function useAskMutation({ 
    enabled = false,
    onError = emptyFunction, 
    onSuccess = emptyFunction,
    onSettled = emptyFunction
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
// mutation.mutate({url: 'resinasbase', method: 'post', data: {}})