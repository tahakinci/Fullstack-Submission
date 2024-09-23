import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    getNotification(state, action) {
      return `You voted '${action.payload}'`;
    },
  },
});

export const { getNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
