//NO USADO HASTA AHORA

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetFetch({ url }) {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      return axios.get(url);
    },
  });

  return { query };
}
