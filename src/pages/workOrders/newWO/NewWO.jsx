import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Query, GET_CLIENTS_BY_SELLER } from "../../../config/api/api";
import TableInstance from "../../../components/table/TableInstance";
import { columns } from "./tableColumns";
import Loader from "../../../components/loader/Loader";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";
import Worksheet from "../commonSubcomponents/Worksheet";

export default function NewWO() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const userState = useSelector((state) => state.reducerUserState.userState);

  const query = Query({
    key: ["Nueva OT"],
    url: GET_CLIENTS_BY_SELLER + userState.id_user,
  });

  React.useEffect(() => {
    pageControl.page !== "NuevaOT" &&
      dispatch(setPageToRender({ page: "NuevaOT", data: [] }));
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {(query.isLoading || query.isFetching) && <Loader />}

      {query.data && pageControl.data.length === 0 && (
        <TableInstance tableData={query.data} tableColumns={columns} />
      )}

      {pageControl.data.length !== 0 && <Worksheet type="Nueva OT" />}
    </div>
  );
}
