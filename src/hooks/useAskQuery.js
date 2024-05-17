import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9010/api/",
});

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
// const query = useAskQuery({queryKey: ['test'], url: 'resinasbase', enabled: false})
