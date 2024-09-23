import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { content: "", style: { display: "none" } },
  reducers: {
    getNotification(state, action) {
      const notification = {
        content: `You voted '${action.payload.content}'`,
        style: action.payload.style,
      };
      return notification;
    },
  },
});

export const { getNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
