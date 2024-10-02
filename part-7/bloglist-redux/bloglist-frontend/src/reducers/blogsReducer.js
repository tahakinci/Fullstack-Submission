import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const newBlogList = state
        .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        .sort((a, b) => b.likes - a.likes);
      return newBlogList;
    },
    deleteBlog(state, action) {
      const id = action.payload;
      const newBlogList = state.filter((blog) => blog.id !== id);
      return newBlogList;
    },
  },
});

const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);
    dispatch(setBlogs(sortedBlogs));
  };
};

export const createNewBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const handleVote = (id, content) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, content);
    dispatch(updateBlog(updatedBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.remove(id);
    dispatch(deleteBlog(id));
  };
};

export default blogsSlice.reducer;
