import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Query, GET_REFORMULATION } from "../../../config/api/api";
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

  const query = Query({
    key: ["Reformulacion"],
    url: GET_REFORMULATION,
  });

  React.useEffect(() => {
    pageControl.page !== "reformulacion" &&
      dispatch(setPageToRender({ page: "reformulacion", data: [] }));
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
