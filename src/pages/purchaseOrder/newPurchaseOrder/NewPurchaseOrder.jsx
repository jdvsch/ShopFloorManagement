import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Query ,GET_NEW_OC } from "../../../config/api/api"
import TableInstance from "../../../components/table/TableInstance";
import { columns } from './tableColumns';
import Loader from '../../../components/loader/Loader';
import { setPageToRender } from '../../../redux/slices/pageToRenderSlice';
import POForm from '../commonSubcomponents/POForm';

export default function NewPurchaseOrder() {
  const dispatch = useDispatch()
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender)

  const { query } = Query({key: ['newOC'], url: GET_NEW_OC})

  React.useEffect(() => {
    pageControl.page !== 'nuevaOC' && dispatch(setPageToRender({page: 'nuevaOC', data: []}))
  }, [])

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {(query.isLoading || query.isFetching) &&
        <Loader />
      }

      {query.data && pageControl.data.length === 0 &&
        <TableInstance tableData={query.data} tableColumns={columns}/>
      }
      
      {pageControl.data.length !== 0 &&
        <POForm  POdata={pageControl.data[0]} type='nuevaOC'/>
      }

    </div>
  )
}

