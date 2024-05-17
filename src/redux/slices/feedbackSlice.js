import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedback: {
    itShows: false,
    showLogo: true,
    data: [],
    mutation: {},
    success: false,
    goto: '',
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
        itShows: false,
        showLogo: true,
        data: [],
        mutation: {},
        success: false,
        goto: '',
        development: false,
        children: []
      };
    }
  },
});

// Action creators are generated for each case reducer function
export const { setFeedback, setResetFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;
