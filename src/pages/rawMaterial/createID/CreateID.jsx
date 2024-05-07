import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";

import IDForm from "../commonSubcomponents/IDForm";

export default function CreateID() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );

  React.useEffect(() => {
    pageControl.page !== "crearID" &&
      dispatch(setPageToRender({ page: "crearID", data: [] }));
  }, []);
    
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <IDForm type="Crear ID" />
    </div>
  );
}
