import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { GET_EDIT_WO } from "../../../config/api/api";
import useAskQuery from "../../../hooks/useAskQuery";
import TableInstance from "../../../components/table/TableInstance";
import { columns } from "./tableColumns";
import Loader from "../../../components/loader/Loader";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";
import Worksheet from "../commonSubcomponents/Worksheet";

export default function EditWO() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const userState = useSelector((state) => state.reducerUserState.userState);

  const query = useAskQuery({queryKey: ['Editar OT'], url: GET_EDIT_WO + userState.id_user})

  React.useEffect(() => {
    pageControl.page !== "EditarOT" &&
      dispatch(setPageToRender({ page: "EditarOT", data: [] }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {(query.isLoading || query.isFetching) && <Loader />}

      {query.data && pageControl.data.length === 0 && (
        <TableInstance tableData={query.data} tableColumns={columns} />
      )}

      {pageControl.data.length !== 0 && <Worksheet type="Editar OT" />}
    </div>
  );
}
