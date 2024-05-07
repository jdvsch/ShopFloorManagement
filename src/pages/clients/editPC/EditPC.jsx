import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Query, GET_ALL_CLIENTS } from "../../../config/api/api";
import TableInstance from "../../../components/table/TableInstance";
import { columns } from "./tableColumns";
import Loader from "../../../components/loader/Loader";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";
import POForm from "../commonSubcomponents/ClientForm";

export default function EditPC() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const userState = useSelector((state) => state.reducerUserState.userState);

  const query = Query({
    key: ["editarCP"],
    url: GET_ALL_CLIENTS + userState.id_user + "/Y",
  });

  React.useEffect(() => {
    pageControl.page !== "editarCP" &&
      dispatch(setPageToRender({ page: "editarCP", data: [] }));
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {(query.isLoading || query.isFetching) && <Loader />}

      {query.data && pageControl.data.length === 0 && (
        <TableInstance tableData={query.data} tableColumns={columns} />
      )}

      {pageControl.data.length !== 0 && <POForm type="EditPC" />}
    </div>
  );
}
