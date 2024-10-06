import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import { initializeBlogs, createNewBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import Toggleable from "./Toggleable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggleable>
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
