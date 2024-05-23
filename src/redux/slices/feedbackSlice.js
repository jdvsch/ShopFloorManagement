import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedback: {
    addNewRecord: false,
    itShows: false,
    showLogo: true,
    data: [],
    mutation: {},
    success: false,
    queryName: [],
    development: false,
    children: []
  },
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedback: (state, action) => {
      state.feedback = { ...state.feedback, ...action.payload };
    },
    setResetFeedback: (state) => {
      state.feedback = {
        addNewRecord: false,
        itShows: false,
        showLogo: true,
        data: [],
        mutation: {},
        success: false,
        queryName: [],
        development: false,
        children: []
      };
    }
  },
});

// Action creators are generated for each case reducer function
export const { setFeedback, setResetFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;
