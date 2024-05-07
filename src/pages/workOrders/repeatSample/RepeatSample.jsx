import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Query, GET_SM_RM_R_OT } from "../../../config/api/api";
import TableInstance from "../../../components/table/TableInstance";
import { columns } from "./tableColumns";
import Loader from "../../../components/loader/Loader";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";
import Worksheet from "../commonSubcomponents/Worksheet";

export default function RepeatSample() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const userState = useSelector((state) => state.reducerUserState.userState);

  const query = Query({
    key: ["Repetir muestra00"],
    url: GET_SM_RM_R_OT + userState.id_user,
  });

  React.useEffect(() => {
    pageControl.page !== "repetirMuestra" &&
      dispatch(setPageToRender({ page: "repetirMuestra", data: [] }));
  }, []);
    
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {(query.isLoading || query.isFetching) && <Loader />}

      {query.data && pageControl.data.length === 0 && (
        <TableInstance tableData={query.data} tableColumns={columns} />
      )}

      {pageControl.data.length !== 0 && <Worksheet type="Repetir muestra" />}
    </div>
  );
}
