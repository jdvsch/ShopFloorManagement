import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { GET_WATCH_ID } from "../../../config/api/api";
import useAskQuery from "../../../hooks/useAskQuery";
import TableInstance from "../../../components/table/TableInstance";
import { columns } from "./tableColumns";
import Loader from "../../../components/loader/Loader";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";

import IDForm from "../commonSubcomponents/IDForm";

export default function EditID() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );

  const query = useAskQuery({queryKey: ['Editar ID'], url: GET_WATCH_ID})

  React.useEffect(() => {
    pageControl.page !== "editarID" &&
      dispatch(setPageToRender({ page: "editarID", data: [] }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {(query.isLoading || query.isFetching) && <Loader />}

      {query.data && pageControl.data.length === 0 && (
        <TableInstance tableData={query.data} tableColumns={columns} />
      )}

      {pageControl.data.length !== 0 && <IDForm type={"Editar ID"}/>}
    </div>
  );
}
