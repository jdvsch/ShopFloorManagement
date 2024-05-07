import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Query, GET_WATCH_ID } from "../../../config/api/api";
import TableInstance from "../../../components/table/TableInstance";
import { columns } from "./tableColumns";
import Loader from "../../../components/loader/Loader";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";


export default function WatchID() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );

  const query = Query({
    key: ["Editar OT"],
    url: GET_WATCH_ID,
  });

  React.useEffect(() => {
    pageControl.page !== "EditarOT" &&
      dispatch(setPageToRender({ page: "EditarOT", data: [] }));
  }, []);
    
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {(query.isLoading || query.isFetching) && <Loader />}

      {query.data && pageControl.data.length === 0 && (
        <TableInstance tableData={query.data} tableColumns={columns} />
      )}

      {/* {pageControl.data.length !== 0 && <Worksheet type="Editar OT" />} */}
    </div>
  );
}
