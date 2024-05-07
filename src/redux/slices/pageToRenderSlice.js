import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageToRender: { page: "", data: {}, submitData: {}, listPageToRender: [] },
};

export const pageToRenderSlice = createSlice({
  name: "pageToRender",
  initialState,
  reducers: {
    setPageToRender: (state, action) => {
      state.pageToRender = { ...state.pageToRender, ...action.payload };
    },
    setResetPageToRender: (state) => {
      state.pageToRender = { page: "", data: [] };
    },
    setResetTotalPageToRender: (state) => {
      state.pageToRender = { page: "", data: [], listPageToRender: [] };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPageToRender,
  setResetPageToRender,
  setResetTotalPageToRender,
} = pageToRenderSlice.actions;

export default pageToRenderSlice.reducer;
