import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9010/api",
});

const getData = () => {
  return axios.get("http://localhost:9010/api/clienteyrefrenciaOC");
};

export const useGettingData = () => {
  return useQuery({
    queryKey: ["testGet"],
    queryFn: getData,
  });
};

const postData = (data) => {
  return axios.post("http://localhost:9010/api/ingresarOC", data);
};

export const useMutationgData = () => {
  return useMutation({
    queryKey: ["testPost"],
    queryFn: postData,
  });
};
