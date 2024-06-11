import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { GET_REFORMULATION } from "../../../config/api/api";
import useAskQuery from "../../../hooks/useAskQuery";
import TableInstance from "../../../components/table/TableInstance";
import { columns } from "./tableColumns";
import Loader from "../../../components/loader/Loader";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";
import Worksheet from "../commonSubcomponents/Worksheet";

export default function Reformulation() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );

  const query = useAskQuery({queryKey: ['Reformulacion'], url: GET_REFORMULATION})

  React.useEffect(() => {
    pageControl.page !== "reformulacion" &&
      dispatch(setPageToRender({ page: "reformulacion", data: [] }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {(query.isLoading || query.isFetching) && <Loader />}

      {query.data && pageControl.data.length === 0 && (
        <TableInstance tableData={query.data} tableColumns={columns} />
      )}

      {pageControl.data.length !== 0 && <Worksheet type="Reformulacion" />}
    </div>
  );
}
