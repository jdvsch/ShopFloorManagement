import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { GET_SM_RM_R_OT } from "../../../config/api/api";
import useAskQuery from "../../../hooks/useAskQuery";
import TableInstance from "../../../components/table/TableInstance";
import { columns } from "./tableColumns";
import Loader from "../../../components/loader/Loader";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";
import Worksheet from "../commonSubcomponents/Worksheet";

export default function OnlySample() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const userState = useSelector((state) => state.reducerUserState.userState);

  const query = useAskQuery({queryKey: ['Muestra'], url: GET_SM_RM_R_OT + userState.id_user})

  React.useEffect(() => {
    pageControl.page !== "Muestra" &&
      dispatch(setPageToRender({ page: "soloMuestra", data: [] }));
  }, []);
    
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {(query.isLoading || query.isFetching) && <Loader />}

      {query.data && pageControl.data.length === 0 && (
        <TableInstance tableData={query.data} tableColumns={columns} />
      )}

      {pageControl.data.length !== 0 && <Worksheet type="Muestra" />}
    </div>
  );
}
