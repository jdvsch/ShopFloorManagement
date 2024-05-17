import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userState: {
    login: false,
    id_user: "",
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    timeOver: "",
    menu: [],
    listPageToRender: []
  },
};

export const userStateSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.userState = { ...state.userState, ...action.payload };
    },
    setResetUserState: (state) => {
      state.userState = {
        login: false,
        id_user: "",
        firstName: "",
        lastName: "",
        email: "",
        birthday: "",
        timeOver: "",
        menu: [],
        listPageToRender: []
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserState, setResetUserState } = userStateSlice.actions;

export default userStateSlice.reducer;
