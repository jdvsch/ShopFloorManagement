import { menu } from "../../fakeAPI/login";


import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query'

import { schema } from './schema';
import { axiosInstance, POST_LOGIN } from "../../config/api/api";
import Loader from "../loader/Loader";
import { useDispatch } from 'react-redux'
import { setUserState } from '../../redux/slices/userStateSlice'

export default function SingIn() {
  const dispatch = useDispatch()

  // chequeo de los campos del formulario
  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });

  const  { isLoading, isFetching, data, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const data = await axiosInstance({
        url: POST_LOGIN,
        method: 'post',
        data: getValues()
      }).catch(
        err => {
          console.log(err)
        }
      )
      return data.data
    },
    enabled: false,
    gcTime: 1000
  })

  React.useEffect(() => {
    if (data?.[0].id !== undefined) {
      const {id: id_user, firstName, lastName, email, birthday, timeOver, updatedAt} = data[0]
      dispatch(setUserState({login: true, id_user, firstName, lastName, email, birthday, timeOver, updatedAt, menu}))
    }
  }, [data])
  
  const onSubmit = () => {
    refetch()
  }

  return (      
    <div className="d-flex justify-content-center" >
      {(isLoading || isFetching) && 
        <Loader />
      }

      <div className="card mt-3 opacity-75" style={{ width: '18rem' }} >

        <div className="col text-center">
          <img className="card-img-top" src="/img/logo.png" alt="logo" style={{width: "150px"}}/>
        </div> 

        <div className="card-body">
          <h5 className="card-title text-center mb-3 text-primary fw-bold">Login</h5>

        <form onSubmit={handleSubmit(onSubmit)}>
        <input 
            {...register("username")} 
            type="text" 
            id="username" 
            className="form-control mb-3 rounded-pill" 
            placeholder='usuario'
            />
          <p>{errors.username?.message}</p>
          <input 
              {...register("password")} 
              type="password" 
              id="password" 
              className="form-control mb-3 rounded-pill" 
              placeholder='clave'
            />
          <p>{errors.password?.message}</p>

          {data?.[0]['message'] &&
            <p className='text-danger fw-bold text-center'>{data[0]['message']}</p>
          }

          <div className="col text-center">
          <button className="btn btn-success rounded">Ingresar</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}
