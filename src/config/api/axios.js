//NO USADO HASTA AHORA

import axios from 'axios'

export const SFM_api = axios.create({
    baseURL: 'http://192.168.1.12:9000/api'
})

export const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.12:9000/api'
})

    const  { isLoading, isFetching, data, isError, error, refetch } = useQuery({
      queryKey: ['todos'],
      queryFn: async () => {
        const data = await axios.get('http://192.168.1.12:9000/api/historyget')
        console.log(data)
        return data.data
      },
      enabled: false
    })

    const  { isLoading, isFetching, data, isError, error, refetch } = useQuery({
      queryKey: ['todos'],
      queryFn: async () => {
        const data = await SFM_api.get('/historyget')
        console.log(data)
        return data.data
      },
      enabled: false
    })

    const  { isLoading, isFetching, data, isError, error, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
          const data = await axiosInstance({
            url: '/historyget',
            method: 'get'
          })
          // console.log(data)
          return data.data
        },
        enabled: false
      })