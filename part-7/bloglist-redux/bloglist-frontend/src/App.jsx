import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  createNewBlog,
  handleVote,
  removeBlog,
} from "./reducers/blogsReducer";
import { loginUser, logoutUser, rememberUser } from "./reducers/usersReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.users);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(rememberUser(user));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(username, password));

      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(
        setNotification(
          {
            status: "error",
            message: "wrong username or password",
          },
          3
        )
      );
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createNewBlog(blogObject));
    dispatch(
      setNotification(
        {
          status: "success",
          message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
        },
        3
      )
    );
  };

  const handleLikes = (id) => {
    try {
      const blog = blogs.find((b) => b.id === id);
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      dispatch(handleVote(id, updatedBlog));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you really want to leave?")) {
        dispatch(removeBlog(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikes={handleLikes}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
