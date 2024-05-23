import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { GET_AJUST_WO } from "../../../config/api/api";
import useAskQuery from "../../../hooks/useAskQuery";
import TableInstance from "../../../components/table/TableInstance";
import { columns } from "./tableColumns";
import Loader from "../../../components/loader/Loader";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";
import Worksheet from "../commonSubcomponents/Worksheet";

export default function AdjustWO() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const userState = useSelector((state) => state.reducerUserState.userState);

  const query = useAskQuery({queryKey: ['Ajustar OT'], url: GET_AJUST_WO + userState.id_user})

  React.useEffect(() => {
    pageControl.page !== "AjustarOT" &&
      dispatch(setPageToRender({ page: "AjustarOT", data: [] }));
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {(query.isLoading || query.isFetching) && <Loader />}

      {query.data && pageControl.data.length === 0 && (
        <TableInstance tableData={query.data} tableColumns={columns} />
      )}

      {pageControl.data.length !== 0 && <Worksheet type="Ajustar OT" />}
    </div>
  );
}
