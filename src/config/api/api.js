// local test http://localhost:9000/api/login;
// server use http://192.168.1.12:9000/api/login;

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.12:9000/api'
})

export function Query(Props) {
    const  query = useQuery({
        queryKey: Props.key,
        queryFn: async () => {
          const data = await axiosInstance({
            url: Props.url,
            method: Props.method = 'get',
            data: Props.data
          }).catch(
            err => {
              console.log(err)
            }
          )
          return data.data
        },
        enabled: Props.enabled = true
      })
    return { query }
}


export const POST_LOGIN = '/login'

export const GET_PRIVATE_NAVBAR = '/menu/'

export const GET_BIRTHDAY = '/birthdays'