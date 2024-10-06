import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    allUsers: [],
  },
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    setAllUsers(state, action) {
      state.allUsers = action.payload;
    },
  },
});

const { setUser, setAllUsers } = usersSlice.actions;

export const rememberUser = (user) => {
  return async (dispatch) => {
    if (user) {
      const token = await blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username: username,
      password: password,
    });
    console.log(user);
    await blogService.setToken(user.token);
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    dispatch(setUser(user));
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    await blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setUser(null));
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setAllUsers(users));
  };
};

export default usersSlice.reducer;
