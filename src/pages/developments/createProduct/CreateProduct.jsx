import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { GET_ALL_CLIENTS_CREATED } from "../../../config/api/api";
import useAskQuery from "../../../hooks/useAskQuery";
import TableInstance from "../../../components/table/TableInstance";
import { columns } from "./tableColumns";
import Loader from "../../../components/loader/Loader";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";
import ProductForm from "../commonSubcomponents/productForm/ProductForm";
import FeedbackComponent from "../../../components/feedbackComponent/FeedbackComponent";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const feedback = useSelector((state) => state.reducerFeedback.feedback);

  const query = useAskQuery({
    queryKey: ["crearProducto"],
    url: GET_ALL_CLIENTS_CREATED,
  });

  const devData = [];
  for (let index = 0; index < 7; index++) {
    devData.push({ materialId: "", percentage: "" });
  }

  React.useEffect(() => {
    pageControl.page !== "crearProducto" &&
      dispatch(setPageToRender({ page: "crearProducto", data: [], devData }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {feedback.itShows && <FeedbackComponent></FeedbackComponent>}
      
      {!feedback.itShows && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {(query.isLoading || query.isFetching) && <Loader />}

          {query.data && pageControl.data.length === 0 && (
            <TableInstance tableData={query.data} tableColumns={columns} />
          )}

          {pageControl.data.length !== 0 && <ProductForm type="Crear Prod" />}
        </div>
      )}
    </>
  );
}
