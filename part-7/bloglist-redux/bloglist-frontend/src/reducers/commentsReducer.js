import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const commentsSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.push(action.payload);
    },
  },
});

const { setComments, appendComment } = commentsSlice.actions;

export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(id);
    dispatch(setComments(comments));
  };
};

export const makeComment = (content, id) => {
  return async (dispatch) => {
    console.log(content);
    const comment = await blogService.createComment(content, id);
    dispatch(appendComment(comment));
  };
};

export default commentsSlice.reducer;
