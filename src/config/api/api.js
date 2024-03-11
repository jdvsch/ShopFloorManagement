// local test http://localhost:9000/api/login;
// server use http://192.168.1.12:9000/api/login;

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:9010/api'
})

export function Query(Props) {
  const {url, data, method = 'get', enabled = true, gcTime = 300000} = Props
    const  query = useQuery({
        queryKey: Props.key,
        queryFn: async () => {
          const datas = await axiosInstance({
            url,
            method,
            data,
          }).catch(
            err => {
              console.log(err)
            }
          )
          return method === 'get' ? datas.data : datas
        },
        enabled,
        gcTime,
      })
    return { query }
}

export const POST_HISTORY = '/historyIntra';

export const POST_LOGIN = '/login'

export const GET_PRIVATE_NAVBAR = '/menu/'

export const GET_BIRTHDAY = '/birthdays'

export const GET_NEW_OC = '/clienteyrefrenciaOC'

export const POST_OC = '/ingresarOC';

export const PUT_OC = '/editarOC/';

export const GET_ALL_OC = '/buscarOC';