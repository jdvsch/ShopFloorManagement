import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from '../config/api/api';

export default function useAskQuery({queryKey, url, enabled = true}) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const info = await axiosInstance({
        url,
      }).catch((err) => {
        return (['err', err.message]);
      });
      return info.data;
    },
    enabled,
    gcTime: 1000,
  });
}

// se llama asi:
// const query = useAskQuery({queryKey: ['test'], url: GET, enabled: false})
// const query = useAskQuery({queryKey: ['test'], url: GET})
