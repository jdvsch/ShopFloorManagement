import { createSlice } from "@reduxjs/toolkit";

const develop = { id_productDevelopment: '', attemps: 1, paused: 0, scale: 100, base_resin: '', dosing: '', f_inicial: '', note: '', id_client: '', times: [] }

const initialState = {
  pageToRender: { 
    page: "", 
    data: [], 
    submitData: {}, 
    listPageToRender: [], 
    subpage:'', 
    record: {}, 
    starPoint: false,
    development : develop,
    modal: false,
    devData: []
  },
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
      state.pageToRender = { page: "", data: [], submitData: {}, listPageToRender: [], subpage:'', record: {}, starPoint: false, development : develop, modal: false, devData: [] };
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
